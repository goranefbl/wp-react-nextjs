import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { Config } from '../model/config';
import Layout from './../components/Layout';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const postsRes = await fetch(`${Config.apiUrl}posts/?slug=${slug}`);
        const posts = await postsRes.json();
        const { ID, post_content: content, post_title: title, post_date: date } = posts[0];
        const menusRes = await fetch(`${Config.apiUrl}menus`);
        const menus = await menusRes.json();
        return { ID, content, title, date, menus };
    }

    render() {
        const { ID, content, title, date, menus } = this.props;
        return (
            <Layout menus={menus}>
                <Article key={ID} id={ID} content={content} title={title} date={date} />
            </Layout>
        );
    }
}

export default Index;
