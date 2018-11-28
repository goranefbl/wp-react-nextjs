import React from 'react';
import App, { Container } from 'next/app';
import { Config } from '../model/config';
import fetch from 'isomorphic-fetch';
import Layout from './../components/Layout';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        const menusRes = await fetch(`${Config.apiUrl}menus`);
        const menus = await menusRes.json();
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
