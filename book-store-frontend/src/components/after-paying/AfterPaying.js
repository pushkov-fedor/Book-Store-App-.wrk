import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import "./AfterPaying.css";

function AfterPaying(props) {

    useEffect(() => {
        if(props.location.state !== undefined && props.location.state.customerEmail !== undefined){
            localStorage.clear();
        }
    });

    return (
        <div className="m-3 p-5 bg-white text-center after-paying-container">
            <div className="mt-4 mb-5 pb-5">
                <h1 className="after-paying-thank-you-header">Thank you for using our service!</h1>
                <h4 className="after-paying-email-subheader">Your books have been sent to your email address:
                    <span className="text-dark"> {props.location.state.customerEmail}</span>
                </h4>
            </div>
            <img className="w-50" src="https://cdn.dribbble.com/users/77552/screenshots/3898134/hurray.png" alt="Happy man"/>
        </div>
    );
}

export default withRouter(AfterPaying);