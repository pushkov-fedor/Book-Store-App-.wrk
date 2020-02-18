import React, {useEffect, useState} from 'react';
import InputMask from 'react-input-mask';
import "./PaymentCard.css";
import { inject, observer } from 'mobx-react'

const PaymentCard = inject("bookStore")(observer((props) => {
    const nameOnCard = props.bookStore.nameOnCard;
    const setNameOnCard = props.bookStore.setNameOnCard;
    const cardNumber = props.bookStore.cardNumber;
    const setCardNumber = props.bookStore.setCardNumber;
    const expirationMonth = props.bookStore.expirationMonth;
    const setExpirationMonth = props.bookStore.setExpirationMonth;
    const expirationYear = props.bookStore.expirationYear;
    const setExpirationYear = props.bookStore.setExpirationYear;
    const cvv = props.bookStore.cvv;
    const setCVV = props.bookStore.setCVV;
    const isPaymentInfoValid = props.bookStore.isPaymentInfoValid;


    function handleNameOnCardChange(event) {
        setNameOnCard(event.target.value);
    }
    function handleCardNumberChange(event) {
        setCardNumber(event.target.value);
    }
    function handleExpirationMonthChange(event) {
        setExpirationMonth(event.target.value);
    }
    function handleExpirationYearChange(event) {
        setExpirationYear(event.target.value);
    }
    function handleCVVChange(event) {
        setCVV(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        props.submitPayment();
    }


    const years = [];
    for(let i = 2020; i <= 2030; i++){
        years.push(<option value={""+i} key={i}>{i}</option>)
    }

    return (
        <div className="p-4 w-100 mt-5 mt-xl-0 payment-card-container">
            <h2 className="text-white payment-card-card-details-header">Card Details</h2>
            <div className="ml-4 mt-4 shadow text-white p-4 d-none d-sm-block payment-card-view-container">
                <h3>Bank Card</h3>
                <h4 className="mt-4 mb-4">{cardNumber.get() === "" ? "XXXX XXXX XXXX XXXX" : cardNumber.get()}</h4>
                <div className="position-relative">
                    <div>
                        <h5 className="payment-card-view-expiration">{`${expirationMonth}/${expirationYear}`}</h5>
                        <h5 style={{opacity: "0.8", visibility: nameOnCard.get() ==="" ? "hidden" : "visible"}}>
                            {nameOnCard.get() === "" ? "John Doe" : nameOnCard.get()}
                        </h5>
                    </div>
                    <img className="position-absolute h-100 payment-card-view-mastercard-logo"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="mastercard logo"/>
                </div>
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameOnCard" className="text-white">Name On Card</label>
                    <input className="form-control text-white border-0 payment-card-input" id="nameOnCard"
                           value={nameOnCard.get()} onChange={handleNameOnCardChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber" className="text-white">Card Number</label>
                    <InputMask id="cardNumber" className="form-control text-center text-white border-0 payment-card-input"
                               value={cardNumber.get()} onChange={handleCardNumberChange} mask="9999    9999    9999    9999" maskChar="X" alwaysShowMask/>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-9 form-group pr-0">
                        <label htmlFor="expirationDate" className="text-white">Expiration Date</label>
                        <div className="row w-100 mx-0">
                            <select className="col-7 custom-select text-white border-0 mr-1 payment-card-input"
                                    value={expirationMonth.get()} onChange={handleExpirationMonthChange}>
                                <option value="01" >January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select className="col-4 custom-select text-white border-0 ml-1 payment-card-input"
                                    value={expirationYear.get()} onChange={handleExpirationYearChange}>
                                {years}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 form-group">
                        <label htmlFor="cvv" className="text-white">CVV</label>
                        <InputMask id="cvv" className="form-control text-center text-white border-0 px-1 payment-card-input"
                                   value={cvv.get()} onChange={handleCVVChange} mask="999" maskChar="X" alwaysShowMask/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100 mb-3 shadow" disabled={!isPaymentInfoValid}>Pay</button>
            </form>
        </div>
    );
}))

export default PaymentCard;