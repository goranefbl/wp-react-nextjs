import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class GreenRushDocument extends Document {
    render() {
        return (
            <html lang="en">
                <Head>
                    <link href="/static/css/style.css" rel="stylesheet" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" type="image/x-icon" href="/static/icons/favicon.ico" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
