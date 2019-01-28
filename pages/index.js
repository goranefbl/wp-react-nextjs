import React, { Component } from 'react';
import cachedFetch from '../utils/cachedFetch';
import config from '../utils/config';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const posts = await cachedFetch(`${config.route}posts`);
        const metaTitle = 'Test Blog Title';
        const metaDescription = 'Meta Blog Description, you should get this from API.';
        return { posts, metaTitle, metaDescription };
    }

    render() {
        const { posts } = this.props;
        return posts.map(post => (
            <Article
                key={post.ID}
                id={post.ID}
                content={post.post_content}
                title={post.post_title}
                slug={post.post_name}
                date={post.post_date}
            />
        ));
    }
}

export default Index;
