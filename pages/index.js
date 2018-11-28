import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Config } from '../model/config';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const postsRes = await fetch(`${Config.apiUrl}posts`);
        const posts = await postsRes.json();
        return { posts };
    }

    render() {
        const { posts } = this.props;
        return posts.map(post => {
            return (
                <Article
                    key={post.ID}
                    id={post.ID}
                    content={post.post_content}
                    title={post.post_title}
                    slug={post.post_name}
                    date={post.post_date}
                />
            );
        });
    }
}

export default Index;
