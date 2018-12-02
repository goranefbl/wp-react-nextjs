const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
    max: 20, // not more than 20 results will be cached
    maxAge: 1000 * 60 * 5 // 5 mins
});

app.prepare()
    .then(() => {
        const server = express();

        server.get('/post/:slug', (req, res) => {
            const actualPage = '/post';
            const queryParams = { slug: req.params.slug, apiRoute: 'post' };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/page/:slug', (req, res) => {
            console.log(req.params.slug);
            const actualPage = '/page';
            const queryParams = { slug: req.params.slug, apiRoute: 'page' };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/category/:slug', (req, res) => {
            const actualPage = '/category';
            const queryParams = { slug: req.params.slug };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/_preview/:id/:wpnonce', (req, res) => {
            const actualPage = '/preview';
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
            renderAndCache(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/', (req, res) => {
            renderAndCache(req, res, '/');
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });

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
