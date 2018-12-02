import React, { Component } from 'react';
import Link, { prefetch } from '../utils/prefetchData';

class Nav extends Component {
    prefetchData(url) {
        // Router.prefetch(`/page?slug=${url}`)
        prefetch(`/page?slug=${url}`);
    }
    render() {
        const { menus } = this.props;
        return (
            <nav id="site-navigation" className="main-navigation" role="navigation">
                <button className="menu-toggle">Menu</button>
                <div className="nav-menu">
                    <ul>
                        {Object.values(menus.glavni.items).map(menu => {
                            const url = menu.url.replace('https://myzonedev.com/headless/', '');
                            return (
                                <li key={menu.ID} className="current_page_item">
                                    <Link href={`/page?slug=${url}`} as={`/page/${url}`}>
                                        <a onMouseOver={() => this.prefetchData(url)}>
                                            {menu.description}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
