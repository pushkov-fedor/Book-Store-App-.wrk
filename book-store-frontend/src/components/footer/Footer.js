import React from 'react';
import {Link} from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <div className="container-fluid d-flex flex-column align-items-center footer-container">
            <nav className="w-75 d-flex flex-column mt-4 mb-2">
                <h3 className="footer-navigation-header">Navigation</h3>
                <Link className="footer-link" to="/">Books Catalog</Link>
                <Link className="footer-link" to="/shopping-cart">Shopping Cart</Link>
                <Link className="footer-link" to="/my-books">My Books</Link>
            </nav>
            <h3 className="mb-4 footer-copyrights">My Book Store, All Rights Reserved</h3>
        </div>
    );
}

export default Footer;