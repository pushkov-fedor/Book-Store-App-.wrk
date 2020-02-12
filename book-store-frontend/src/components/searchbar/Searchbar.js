import React from 'react';
import "./Searchbar.css";

function Searchbar() {
    return (
            <div className="row align-items-center rounded-pill py-1 px-3 d-flex searchbar-container">
                <input type="text" className="mw-75 col-10 col-sm-9 w-75 bg-transparent border-0 p-2 searchbar-input" placeholder="Search"/>
                <button type="submit" className="col-2 col-sm-3 border-0 bg-transparent search-button d-flex justify-content-end" >
                    <i className="fas fa-search p-2 rounded-circle searchbar-icon"/>
                </button>
            </div>
    );
}

export default Searchbar;