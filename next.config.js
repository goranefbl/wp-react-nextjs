const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withOffline = require('next-offline');

module.exports = withSass(
    withImages(
        withOffline({
            distDir: 'build',
            scope: '.',
            // registerSwPrefix: '/newblog',
            workboxOpts: {
                globPatterns: ['static/**/*'],
                globDirectory: '.',
                runtimeCaching: [
                    {
                        urlPattern: /^https.*/,
                        handler: 'networkFirst',
                        options: {
                            cacheName: 'https-calls',
                            networkTimeoutSeconds: 15,
                            expiration: {
                                maxEntries: 150,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    )
);
