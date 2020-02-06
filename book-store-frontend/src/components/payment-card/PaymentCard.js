import React, {useState} from 'react';
import InputMask from 'react-input-mask';

function PaymentCard(props) {

    const [nameOnCard, setNameOnCard] = useState("John Doe");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationMonth, setExpirationMonth] = useState("01");
    const [expirationYear, setExpirationYear] = useState("2024");
    const [cvv, setCVV] = useState();


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


    const years = [];
    for(let i = 2020; i <= 2030; i++){
        years.push(<option value={""+i} key={i}>{i}</option>)
    }

    return (
        <div className="p-4 w-100 mt-5 mt-xl-0" style={{backgroundColor: "rgba(0,0,0,0.65)", borderRadius: "10px"}}>
            <h2 className="text-white" style={{fontSize: "1.4rem", fontWeight: "400"}}>Card Details</h2>
            <div className="ml-4 mt-4 shadow text-white p-4 d-none d-sm-block" style={{width: "115%", backgroundColor: "#1D2029", borderRadius: "10px"}}>
                <h3>Bank Card</h3>
                <h4 className="mt-4 mb-4">{cardNumber=="" ? "XXXX XXXX XXXX XXXX" : cardNumber}</h4>
                <div className="position-relative">
                    <div>
                        <h5 style={{opacity: "0.8"}}>{`${expirationMonth}/${expirationYear}`}</h5>
                        <h5 style={{opacity: "0.8", visibility: nameOnCard=="" ? "hidden" : "visible"}}>{nameOnCard == "" ? "John Doe" : nameOnCard}</h5>
                    </div>
                    <img className="position-absolute h-100" style={{bottom: "0", right: "0"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"/>
                </div>
            </div>
            <form className="mt-4">
                <div className="form-group">
                    <label htmlFor="nameOnCard" className="text-white">Name On Card</label>
                    <input className="form-control text-white border-0" id="nameOnCard" placeholder="John Doe" style={{backgroundColor: "#1D2029"}} value={nameOnCard} onChange={handleNameOnCardChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber" className="text-white">Card Number</label>
                    <InputMask id="cardNumber" className="form-control text-center text-white border-0" value={cardNumber} onChange={handleCardNumberChange} mask="9999    9999    9999    9999" maskChar="X" alwaysShowMask  style={{backgroundColor: "#1D2029"}}/>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-9 form-group pr-0">
                        <label htmlFor="expirationDate" className="text-white">Expiration Date</label>
                        <div className="row w-100 mx-0">
                            <select className="col-7 custom-select text-white border-0 mr-1" value={expirationMonth} onChange={handleExpirationMonthChange} style={{backgroundColor: "#1D2029"}}>
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
                            <select className="col-4 custom-select text-white border-0 ml-1" value={expirationYear} onChange={handleExpirationYearChange} style={{backgroundColor: "#1D2029"}}>
                                {years}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 form-group">
                        <label htmlFor="cvv" className="text-white">CVV</label>
                        <InputMask id="cvv" className="form-control text-center text-white border-0 px-1" value={cvv} onChange={handleCVVChange} mask="999" maskChar="X" alwaysShowMask style={{backgroundColor: "#1D2029"}}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100 mb-3 shadow">Pay</button>
            </form>
        </div>
    );
}

export default PaymentCard;