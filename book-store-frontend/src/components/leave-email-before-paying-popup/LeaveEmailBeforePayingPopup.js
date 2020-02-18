import {Link} from "react-router-dom";
import React, {useState} from 'react';
import "./LeaveEmailBeforePayingPopup.css";
import { inject, observer } from 'mobx-react'
import { paymentStore } from '../../stores/PaymentStore'

const LeaveEmailBeforePayingPopup = inject("rootStore")(observer(props => {

    const customerEmail = props.rootStore.paymentStore.customerEmail;
    const setCustomerEmail = props.rootStore.paymentStore.setCustomerEmail;

    function handleClickOnBg(event){
        if(event.target.id==="popup-bg") props.setShowPopup(false);
    }

    function handleChange(event){
        setCustomerEmail(event.target.value);
    }

    return (
        <div className="position-fixed d-flex justify-content-center align-items-center leave-email-before-paying-popup-container"
             id="popup-bg" onClick={handleClickOnBg}>
            <div className="m-3 p-5 bg-white leave-email-before-paying-popup-subcontainer">
                <h3 className="leave-email-before-paying-popup-last-moment-header">One last moment...</h3>
                <h5 className="leave-email-before-paying-popup-email-header">Before paying leave your email so that we could send you your books</h5>
                <div className="row mt-3 mt-sm-4 d-flex justify-content-center align-items-center mx-0">
                    <div className="input-group col-12 col-sm-6 px-0 mb-2 mb-sm-0">
                        <div className="input-group-prepend">
                            <div className="input-group-text">@</div>
                        </div>
                        <input type="email" className="form-control" id="inlineFormInputGroup"
                               placeholder="Email" value={customerEmail.get()} onChange={handleChange}/>
                    </div>
                    <Link to={{pathname: "/after-paying", state: {customerEmail: customerEmail.get()}}}
                          style={{pointerEvents: customerEmail.get() === "" ? "none" : "auto"}}
                          className={`btn ${customerEmail.get() === "" ? "btn-secondary" : "btn-primary"} w-100 col-12 col-sm-3 mx-3`}>Submit</Link>
                </div>
            </div>
        </div>
    );
}))

export default LeaveEmailBeforePayingPopup;
