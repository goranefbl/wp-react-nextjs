import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const postsRes = await fetch(`https://ticketzone.com/feed/events/BrWspGXN6M`);
        const feed = await postsRes.json();
        return { feed: feed.events };
    }

    render() {
        const { feed } = this.props;
        return feed.map((post, i) => {
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
        });
    }
}

export default Index;
