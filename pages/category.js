import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { Config } from '../model/config';
import Layout from './../components/Layout';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const postsRes = await fetch(`https://ticketzone.com/feed/events/BrWspGXN6M`);
        const feed = await postsRes.json();
        const menusRes = await fetch(`${Config.apiUrl}menus`);
        const menus = await menusRes.json();
        return { menus, feed: feed.events };
    }

    render() {
        const { feed, menus } = this.props;
        return (
            <Layout menus={menus}>
                {feed.map((post, i) => {
                    return (
                        <Article
                            key={post.eventId}
                            id={post.eventId}
                            content={post.description}
                            title={`${i} - ${post.title}`}
                            slug={post.eventflyerimg}
                            date={post.eventdate}
                        />
                    );
                })}
            </Layout>
        );
    }
}

export default Index;
