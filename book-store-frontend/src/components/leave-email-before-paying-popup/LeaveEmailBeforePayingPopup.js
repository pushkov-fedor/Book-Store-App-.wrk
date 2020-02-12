import {Link} from "react-router-dom";
import React, {useState} from 'react';

function LeaveEmailBeforePayingPopup(props) {

    const [customerEmail, setCustomerEmail] = useState("");

    function handleClickOnBg(event){
        if(event.target.id==="popup-bg") props.setShowPopup(false);
    }

    function handleChange(event){
        setCustomerEmail(event.target.value);
    }

    return (
        <div className="position-fixed d-flex justify-content-center align-items-center" id="popup-bg" onClick={handleClickOnBg} style={{
            top: "0",
            left: "0",
            height:" 100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.35)"
        }}>
            <div className="m-3 p-5 bg-white" style={{borderRadius: "20px"}}>
                <h3 style={{opacity: "0.8"}}>One last moment...</h3>
                <h5 style={{opacity: "0.6", fontStyle: "italic"}}>Before paying leave your email so that we could send you your books</h5>
                <div className="row mt-3 mt-sm-5 d-flex justify-content-center align-items-center mx-0">
                    <div className="input-group col-12 col-sm-6 px-0 mb-2 mb-sm-0">
                        <div className="input-group-prepend">
                            <div className="input-group-text">@</div>
                        </div>
                        <input type="email" className="form-control" id="inlineFormInputGroup"
                               placeholder="Email" value={customerEmail} onChange={handleChange}/>
                    </div>
                    <Link to={{pathname: "/after-paying", state: {customerEmail}}} style={{pointerEvents: customerEmail==="" ? "none" : "auto"}}
                          className={`btn ${customerEmail==="" ? "btn-secondary" : "btn-primary"} w-100 col-12 col-sm-3 mx-3`}>Submit</Link>
                </div>
            </div>
        </div>
    );
}

export default LeaveEmailBeforePayingPopup;
