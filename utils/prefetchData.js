import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import exact from 'prop-types-exact';
import { format, resolve, parse } from 'url';

export const prefetch = async href => {
    // if  we're running server side do nothing
    if (typeof window === 'undefined') return;

    const url = typeof href !== 'string' ? format(href) : href;

    const { pathname } = window.location;

    const parsedHref = resolve(pathname, url);

    const { query } = typeof href !== 'string' ? href : parse(url, true);

    const Component = await Router.prefetch(parsedHref);

    // if Component exists and has getInitialProps
    // fetch the component props (the component should save it in cache)
    if (Component && Component.getInitialProps) {
        const ctx = { pathname: href, query, isVirtualCall: true };
        await Component.getInitialProps(ctx);
    }
};

// extend default next/link to customize the prefetch behaviour
class LinkWithData extends Link {
    // re defined Link propTypes to add `withData`
    static propTypes = exact({
        href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        prefetch: PropTypes.bool,
        replace: PropTypes.bool,
        shallow: PropTypes.bool,
        passHref: PropTypes.bool,
        scroll: PropTypes.bool,
        withData: PropTypes.bool, // our custom prop
        children: PropTypes.PropTypes.element.isRequired
    });

    // our custom prefetch method
    async prefetch() {
        // if the prefetch prop is not defined do nothing
        if (!this.props.prefetch) return;

        // if withData prop is defined
        // prefetch with data
        // otherwise just prefetch the page
        if (this.props.withData) {
            prefetch(this.props.href);
        } else {
            super.prefetch();
        }
    }
}
// Adding active class
const LinkActive = withRouter(({ router, children, href, as, ...rest }) => (
    <LinkWithData {...rest} href={href} as={as}>
        {React.cloneElement(Children.only(children), {
            className:
                router.asPath === href || router.asPath === as
                    ? `${children.props.className} ${children.props.className}--active`
                    : children.props.className
        })}
    </LinkWithData>
));
export default LinkActive;
