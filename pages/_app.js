import React from 'react';
import App, { Container } from 'next/app';
import { Config } from '../model/config';
import cachedFetch, { overrideCache } from '../utils/cachedFetch';
import Layout from './../components/Layout';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        const menus = await cachedFetch(`${Config.apiUrl}menus`);
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps, menus };
    }

    render() {
        const { Component, pageProps, menus } = this.props;

        return (
            <Container>
                <Layout menus={menus}>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        );
    }
}
