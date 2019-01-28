import React from 'react';
import App, { Container } from 'next/app';
import config from '../utils/config';
import cachedFetch, { overrideCache } from '../utils/cachedFetch';
import Layout from '../components/Layout';
import Head from '../components/Head';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        const menus = await cachedFetch(`${config.route}menus`);
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps, menus };
    }

    render() {
        const { Component, pageProps, menus } = this.props;

        return (
            <Container>
                <Head metaTitle={pageProps.metaTitle} metaDescription={pageProps.metaDescription} />
                <Layout menus={menus}>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        );
    }
}
