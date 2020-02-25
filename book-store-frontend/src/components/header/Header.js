import React from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import { inject, observer } from 'mobx-react'
import "./Header.css";

const Header = inject("rootStore")(observer((props) => {

    const toggleShowAuthPopup = props.rootStore.authStore.toggleShowAuthPopup;
    const showAuthPopup = props.rootStore.authStore.showAuthPopup;

    return (
        <nav className="navbar navbar-expand-sm sticky-top navbar-container" id="header">
            <div className="container flex-column flex-sm-row">
                <Link className="navbar-brand text-white mr-0 justify-content-center justify-content-xs-start navbar-brand-custom" to="/">My Book Store</Link>
                <ul className="nav justify-content-center justify-content-xs-end">
                    <li className={props.location.pathname === "/shopping-cart" ? "nav-item nav-item-hover nav-item-current" : "nav-item nav-item-hover"} >
                        <Link className="nav-link text-white" to="/shopping-cart">Shopping Cart</Link>
                    </li>
                    <li className={showAuthPopup.get() ? "nav-item nav-item-hover nav-item-current" : "nav-item nav-item-hover"}
                        onClick={() => toggleShowAuthPopup()}>
                        <div className="nav-link text-white">Login</div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}))

export default withRouter(Header);