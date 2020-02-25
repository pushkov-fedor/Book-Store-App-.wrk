import {Link} from "react-router-dom";
import React, {useState} from 'react';
import "./LeaveEmailBeforePayingPopup.css";
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

const LeaveEmailBeforePayingPopup = inject("rootStore")(observer(props => {

    const customerEmail = props.rootStore.paymentStore.customerEmail;
    const setCustomerEmail = props.rootStore.paymentStore.setCustomerEmail;

    function handleClickOnBg(event){
        if(event.target.id==="popup-bg") props.setShowPopup(false);
    }

    function handleChange(event){
        setCustomerEmail(event.target.value);
    }

    const sendEmail = function(){
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/payment/after");
        xhr.send(JSON.stringify({customerEmail: customerEmail.get(), books: toJS(props.rootStore.bookStore.savedBooks)}));
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){

            }
        };
    }

    return (
        <div className="position-fixed d-flex justify-content-center align-items-center leave-email-before-paying-popup-container"
             id="popup-bg" onClick={handleClickOnBg}>
          <div className="m-5 p-5 bg-white leave-email-before-paying-popup-subcontainer m-sm-5">
            <h3 className="leave-email-before-paying-popup-last-moment-header">One last moment...</h3>
            <h5 className="leave-email-before-paying-popup-email-header">Before paying leave your email so that we could send you your books</h5>
            <div className="row mt-3 d-flex justify-content-between align-items-center mx-0">
              <div className="input-group col-12 col-md-7 col-xl-7 px-0 mb-2 mb-md-0">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input type="email" className="form-control" id="inlineFormInputGroup"
                       placeholder="Email" value={customerEmail.get()} onChange={handleChange}/>
              </div>
              <Link to={{pathname: "/after-paying", state: {customerEmail: customerEmail.get()}}} onClick={() => sendEmail()}
                    style={{pointerEvents: customerEmail.get() === "" ? "none" : "auto"}}
                    className={`btn ${customerEmail.get() === "" ? "btn-secondary" : "btn-primary"} w-100 col-12 col-md-4 col-xl-3 mx-1 mx-xl-3`}>Submit</Link>
            </div>
          </div>
        </div>
    );
}))

export default LeaveEmailBeforePayingPopup;
