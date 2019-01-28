import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default props => {
    const { menus, children } = props;
    return (
        <div id="page" className="hfeed site">
            <Header menus={menus} />
            <div id="main" className="wrapper">
                <section id="primary" className="site-content">
                    <div id="content" role="main">
                        {children}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};
