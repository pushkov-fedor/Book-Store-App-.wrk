import React from 'react';
import "./Searchbar.css";

function Searchbar(props) {
    return (
        <div className="row align-items-center rounded-pill py-1 px-3" style={{backgroundColor: "rgba(0,0,0,.9)"}}>
            <input type="text" className="col-lg-9 bg-transparent border-0 p-2 searchbar-input" placeholder="Search" style={{color: "rgba(255,255,255,0.85)"}}/>
            <button type="submit" className="d-none col-lg-3 border-0 bg-transparent search-button d-lg-flex justify-content-end" >
                <i className="fas fa-search p-2 rounded-circle" style={{color: "#4B5EE8", backgroundColor: "#fff"}}></i>
            </button>
        </div>
    );
}

export default Searchbar;