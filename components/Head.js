import React from 'react';
import Head from 'next/head';

const HTMLHead = props => {
    const { metaTitle, metaDescription } = props;
    return (
        <Head>
            <link href="/static/css/style.css" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="/static/icons/favicon.ico" />
            <link rel="manifest" href="/static/manifest.json" />
            <title>{metaTitle}</title>
            <meta name="Description" content={metaDescription} />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
};

export default HTMLHead;
