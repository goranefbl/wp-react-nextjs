import React from 'react';
import LazyLoad from 'react-lazyload';

export default props => {
    const { alt, src, height, className } = props;
    return (
        <LazyLoad offset={100} height={height}>
            <img alt={alt} className={className} src={src} height={height} />
        </LazyLoad>
    );
};
