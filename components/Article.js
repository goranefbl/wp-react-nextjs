import React, { Components } from 'react';
import Link from 'next/link';

const Nav = props => {
    return (
        <article className="post type-post status-publish format-standard">
            <header className="entry-header">
                <h1 className="entry-title">
                    {props.slug ? (
                        <Link href={`/post?slug=${props.slug}`} as={`/post/${props.slug}`}>
                            <a rel="bookmark">{props.title}</a>
                        </Link>
                    ) : (
                        <span rel="bookmark">{props.title}</span>
                    )}
                </h1>
            </header>
            <div className="entry-content" dangerouslySetInnerHTML={{ __html: props.content }} />

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
};

export default Nav;
