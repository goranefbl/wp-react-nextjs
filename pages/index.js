import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Config } from '../model/config';
import Layout from './../components/Layout';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const postsRes = await fetch(`${Config.apiUrl}posts`);
        const posts = await postsRes.json();
        const menusRes = await fetch(`${Config.apiUrl}menus`);
        const menus = await menusRes.json();
        return { posts, menus };
    }

    render() {
        const { posts, menus } = this.props;
        return (
            <Layout menus={menus}>
                {posts.map(post => {
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
                })}
            </Layout>
        );
    }
}

export default Index;
