import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";

function AfterPaying(props) {

    useEffect(() => {
        if(props.location.state != undefined && props.location.state.customerEmail != undefined){
            localStorage.clear();
        }
    })

    return (
        <div className="m-3 p-5 bg-white text-center" style={{borderRadius: "20px"}}>
            <div className="mt-4 mb-5 pb-5">
                <h1 style={{color: "#4B5EE8", fontSize: "3rem"}}>Thank you for using our service!</h1>
                <h4 style={{color: "rgba(0,0,0,0.6)", fontStyle: "italic"}}>Your books have been sent to your email address:
                    <span style={{color: "#000"}}> {props.location.state.customerEmail}</span>
                </h4>
            </div>
            <img className="w-50" src="https://cdn.dribbble.com/users/77552/screenshots/3898134/hurray.png"/>
        </div>
    );
}

export default withRouter(AfterPaying);