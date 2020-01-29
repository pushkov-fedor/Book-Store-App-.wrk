import React from 'react';
import "./Header.css";

function Header(props) {

    var navbarStyle = {
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#191919"
    }

    var navbarBrandStyle = {
        fontSize: "2rem",
        fontWeight: "500"
    }

    return (
        <nav className="navbar navbar-expand-sm position-sticky fixed-top" style={navbarStyle}>
            <div className="container">
                <a className="navbar-brand text-white" href="#" style={navbarStyle}>My Book Store</a>
                <ul className="nav justify-content-end">
                    <li className="nav-item nav-item-hover" >
                        <a className="nav-link text-white" href="#">Shopping Cart</a>
                    </li>
                    <li className="nav-item nav-item-hover" >
                        <a className="nav-link text-white" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;