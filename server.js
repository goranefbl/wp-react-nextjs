const { join } = require('path');
const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });

const ssrCache = new LRUCache({
    max: 1024, // not more than 100 results will be cached
    maxAge: 1000 * 60 * 5 // 5 mins
});

const handle = app.getRequestHandler();

// This is not active yet.
async function renderAndCache(req, res, pagePath, queryParams) {
    const key = req.url;
    // if page is in cache, server from cache
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    try {
        // if not in cache, render the page into HTML
        const html = await app.renderToHTML(req, res, pagePath, queryParams);

        // if something wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return;
        }

        ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, pagePath, queryParams);
    }
}

app.prepare()
    .then(() => {
        const server = express();

        server.use(compression());

        server.get('/service-worker.js', (req, res) => {
            const filePath = join(__dirname, 'build', '/service-worker.js');
            app.serveStatic(req, res, filePath);
        });

        server.get('/:slug', (req, res) => {
            const actualPage = '/post';
            const queryParams = { slug: req.params.slug };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/category/:slug', (req, res) => {
            const actualPage = '/category';
            const queryParams = { slug: req.params.slug };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/_preview/:id/:wpnonce', (req, res) => {
            const actualPage = '/preview';
            const queryParams = {
                id: req.params.id,
                wpnonce: req.params.wpnonce
            };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/', (req, res) => {
            renderAndCache(req, res, '/', {});
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
