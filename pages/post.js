import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Config } from '../model/config';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const postsRes = await fetch(`${Config.apiUrl}posts/?slug=${slug}`);
        const posts = await postsRes.json();
        const { ID, post_content: content, post_title: title, post_date: date } = posts[0];
        return { ID, content, title, date };
    }

    render() {
        const { ID, content, title, date } = this.props;
        return <Article key={ID} id={ID} content={content} title={title} date={date} />;
    }
}

export default Index;
