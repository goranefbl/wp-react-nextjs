import React, { Component } from 'react';
import cachedFetch, { overrideCache } from '../utils/cachedFetch';
import config from '../utils/config';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(ctx) {
        const { page, apiRoute } = ctx.query;
        const posts = await cachedFetch(`${config.route}pages/?slug=${page}`);
        const { ID, post_content: content, post_title: title, post_date: date } = posts[0];
        const metaTitle = title;
        const metaDescription = 'Meta Blog Description, you should get this from API.';
        return { ID, content, title, date, metaTitle, metaDescription };
    }

    render() {
        const { ID, content, title, date } = this.props;
        return <Article key={ID} id={ID} content={content} title={title} date={date} />;
    }
}

export default Index;
