import Head from './Head';
import Header from './Header';
import Footer from './Footer';

export default props => {
    return (
        <div id="page" className="hfeed site">
            <Head />
            <Header menus={props.menus} />
            <div id="main" className="wrapper">
                <section id="primary" className="site-content">
                    <div id="content" role="main">
                        {props.children}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};
