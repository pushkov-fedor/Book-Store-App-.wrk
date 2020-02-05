import React from 'react';
import InputMask from 'react-input-mask';

function PaymentCard(props) {
    return (
        <div className="w-100 p-4" style={{backgroundColor: "rgba(0,0,0,0.65)", borderRadius: "10px", height: "70vh"}}>
            <h2 className="text-white" style={{fontSize: "1.4rem", fontWeight: "400"}}>Card Details</h2>
            <div className="ml-5 mt-5 shadow" style={{height: "35%", width: "110%", backgroundColor: "#1D2029", borderRadius: "10px"}}> AAA</div>
            <form className="mt-4">
                <div className="form-group">
                    <label htmlFor="nameOnCard" className="text-white">Name On Card</label>
                    <input className="form-control text-white border-0" id="nameOnCard" placeholder="John Doe" style={{backgroundColor: "#1D2029"}}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber" className="text-white">Card Number</label>
                    <InputMask id="cardNumber" className="form-control text-center text-white border-0" mask="9999    9999    9999    9999" maskChar="X" alwaysShowMask  style={{backgroundColor: "#1D2029"}}/>
                </div>
                <div className="row">
                    <div className="col-8 form-group">
                        <label htmlFor="expirationDate" className="text-white">Expiration Date</label>
                        <InputMask id="expirationDate" className="form-control text-center text-white border-0" mask="99/9999" maskChar="X" defaultValue="02\2020" alwaysShowMask style={{backgroundColor: "#1D2029"}}/>
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="cvv" className="text-white">CVV</label>
                        <InputMask id="cvv" className="form-control text-center text-white border-0" mask="999" maskChar="X" alwaysShowMask style={{backgroundColor: "#1D2029"}}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100 shadow">Pay</button>
            </form>
        </div>
    );
}

export default PaymentCard;