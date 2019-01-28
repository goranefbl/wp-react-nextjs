import React, { PureComponent } from 'react';
import Link from 'next/link';

class Article extends PureComponent {
    render() {
        const { slug, content, title } = this.props;
        return (
            <article className="post type-post status-publish format-standard">
                <header className="entry-header">
                    <h1 className="entry-title">
                        {slug ? (
                            <Link href={`/post?slug=${slug}`} as={`/${slug}`}>
                                <a rel="bookmark">{title}</a>
                            </Link>
                        ) : (
                            <span rel="bookmark">{title}</span>
                        )}
                    </h1>
                </header>
                <div className="entry-content" dangerouslySetInnerHTML={{ __html: content }} />

                <footer className="entry-meta">
                    This entry was posted in{' '}
                    <a href="#" rel="category">
                        Uncategorized
                    </a>{' '}
                    on{' '}
                    <a href="#" title="10:40 pm" rel="bookmark">
                        <time className="entry-date">June 4, 2008</time>
                    </a>
                    <span className="by-author">
                        {' '}
                        by{' '}
                        <span className="author vcard">
                            <a
                                className="url fn n"
                                href="https://wp-themes.com/?author=1"
                                title="View all posts by Theme Admin"
                                rel="author"
                            >
                                Theme Admin
                            </a>
                        </span>
                    </span>
                    .{' '}
                </footer>
            </article>
        );
    }
}

export default Article;
