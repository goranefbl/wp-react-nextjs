import React, { Component } from 'react';
import Nav from './Nav';
import Link from 'next/link';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { menus } = this.props;
        return (
            <header id="masthead" className="site-header" role="banner">
                <hgroup>
                    <h1 className="site-title">
                        <Link href="/">
                            <a rel="home">Home</a>
                        </Link>
                    </h1>
                    <h2 className="site-description">Opis</h2>
                </hgroup>
                <Nav menus={menus} />
            </header>
        );
    }
}

export default Header;
