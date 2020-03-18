import { Link } from "react-router-dom";
import React from "react";
import "./LeaveEmailBeforePayingPopup.css";
import { inject, observer } from "mobx-react";

const LeaveEmailBeforePayingPopup = inject("rootStore")(
  observer(props => {
    const customerEmail = props.rootStore.paymentStore.customerEmail;
    const setCustomerEmail = props.rootStore.paymentStore.setCustomerEmail;
    const savedBooks = props.rootStore.bookStore.savedBooks;
    const sendEmail = props.rootStore.paymentStore.sendEmail;

    function handleChange(event) {
      setCustomerEmail(event.target.value);
    }

    return (
      <div
        className="position-fixed d-flex justify-content-center align-items-center leave-email-before-paying-popup-container"
        id="popup-bg"
      >
        <div className="m-5 p-5 bg-white leave-email-before-paying-popup-subcontainer m-sm-5">
          <h3 className="leave-email-before-paying-popup-last-moment-header">
            One last moment...
          </h3>
          <h5 className="leave-email-before-paying-popup-email-header">
            Before paying leave your email so that we could send you your books
          </h5>
          <div className="row mt-3 d-flex justify-content-between align-items-center mx-0">
            <div className="input-group col-12 col-md-7 col-xl-7 px-0 mb-2 mb-md-0">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input
                type="email"
                className="form-control"
                id="inlineFormInputGroup"
                placeholder="Email"
                value={customerEmail.get()}
                onChange={handleChange}
              />
            </div>
            <Link
              to={{
                pathname: "/after-paying",
                state: { customerEmail: customerEmail.get() }
              }}
              onClick={() => sendEmail(savedBooks)}
              style={{
                pointerEvents: customerEmail.get() === "" ? "none" : "auto"
              }}
              className={`btn ${
                customerEmail.get() === "" ? "btn-secondary" : "btn-primary"
              } w-100 col-12 col-md-4 col-xl-3 mx-1 mx-xl-3`}
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    );
  })
);

export default LeaveEmailBeforePayingPopup;
