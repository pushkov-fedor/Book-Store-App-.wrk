import React from 'react';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-light" style={{boxShadow: "0 2px 5px rgba(0,0,0,0.1)"}}>
            <div className="container">
                <a className="navbar-brand" href="#" style={{color: "rgba(0,0,0,1)", fontSize: "2rem", fontWeight: "500"}}>My Book Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="#">
                            <i className="fas fa-shopping-cart text-primary" style={{fontSize: "2rem", marginRight: "1rem"}}>
                            </i>
                        <span className="navbar-toggler" style={{border: "none", width: "100%"}}>Shopping cart</span></a>
                        <a className="nav-item nav-link" href="#">
                            <i className="fas fa-user-circle text-primary" style={{fontSize: "2.2rem", marginRight: "1.1rem"}}>
                            </i>
                            <span className="navbar-toggler" style={{border: "none"}}>Profile</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;