import React from 'react';
import Head from 'next/head';

const HTMLHead = props => {
    const { metaTitle, metaDescription } = props;
    return (
        <Head>
            <title>{metaTitle}</title>
            <meta name="Description" content={metaDescription} />
        </Head>
    );
};

export default HTMLHead;
