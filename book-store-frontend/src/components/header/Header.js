import React from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import "./Header.css";

function Header(props) {

    return (
        <nav className="navbar navbar-expand-sm position-sticky fixed-top" style={navbarStyle}>
            <div className="container flex-column flex-sm-row">
                <Link className="navbar-brand text-white mr-0 justify-content-center justify-content-xs-start" style={navbarBrandStyle} to="/frontend">My Book Store</Link>
                <ul className="nav justify-content-center justify-content-xs-end">
                    <li className={props.location.pathname === "/shopping-cart" ? "nav-item nav-item-hover nav-item-current" : "nav-item nav-item-hover"} >
                        <Link className="nav-link text-white" to="/shopping-cart">Shopping Cart</Link>
                    </li>
                    <li className={props.location.pathname === "/login" ? "nav-item nav-item-hover nav-item-current" : "nav-item nav-item-hover"} >
                        <Link className="nav-link text-white" to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

const navbarStyle = {
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#191919"
};

const navbarBrandStyle = {
    fontSize: "2rem",
    fontWeight: "500"
};

export default withRouter(Header);