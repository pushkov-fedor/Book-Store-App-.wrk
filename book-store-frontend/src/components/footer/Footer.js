import React from 'react';
import {Link} from "react-router-dom";

function Footer(props) {
    return (
        <div className="container-fluid d-flex flex-column align-items-center" style={footerStyle}>
            <nav className="w-75 d-flex flex-column mt-4 mb-2">
                <h3 style={footerNavigationHeaderStyle}>Navigation</h3>
                <Link style={footerLinkStyle} to="/frontend">Books Catalog</Link>
                <Link style={footerLinkStyle} to="/shopping-cart">Shopping Cart</Link>
                <Link style={footerLinkStyle} to="/my-books">My Books</Link>
            </nav>
            <h3 className="mb-4" style={footerCopyrightsStyle}>My Book Store, All Rights Reserved</h3>
        </div>
    );
}

const footerStyle = {
    backgroundColor: '#191919',
    flexShrink: '0'
};

const footerNavigationHeaderStyle = {
    color: '#fff',
    fontSize: '1.4rem',
    fontWeight: '500'
};

const footerLinkStyle = {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none'
};

const footerCopyrightsStyle = {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '1rem',
    fontWeight: 100
};

export default Footer;