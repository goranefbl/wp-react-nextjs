import React, { Component } from 'react';
import Link from 'next/link';

class Nav extends Component {
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
                                    <Link prefetch href={`/page?slug=${url}`} as={`/page/${url}`}>
                                        <a>{menu.description}</a>
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
