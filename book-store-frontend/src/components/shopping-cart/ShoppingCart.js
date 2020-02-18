import React, {useState} from 'react';
import ShoppingCartItem from "../shopping-cart-item/ShoppingCartItem";
import PaymentCard from "../payment-card/PaymentCard";
import LeaveEmailBeforePayingPopup from "../leave-email-before-paying-popup/LeaveEmailBeforePayingPopup";
import "./ShoppingCart.css";
import { inject, observer } from 'mobx-react'

const ShoppingCart = inject("rootStore")(observer((props) => {

    const books = props.rootStore.bookStore.savedBooks;
    const removeBookFromLocalStorage = props.rootStore.bookStore.removeBookFromLocalStorage;
    const addBookToLocalStorage = props.rootStore.bookStore.addBookToLocalStorage;

    const [booksInCart, setBooksInCart] = useState(books.map(book => Object.assign({}, book, {isStillInCart: true})));
    const [showPopup, setShowPopup] = useState(false);

  const savedBooksElement = booksInCart.map(book=>
    <ShoppingCartItem key={book.id} cover={book.cover} id={book.id} title={book.title} author={book.author}
                      price={book.price}
                      isStillInCart={book.isStillInCart} booksInCart={booksInCart} setBooksInCart={setBooksInCart}
                      removeBookFromLocalStorage={removeBookFromLocalStorage}
                      addBookToLocalStorage={addBookToLocalStorage}/>)
  const summaryPrice = booksInCart.filter(book => book.isStillInCart).map(book => book.price).reduce((accumulator, price) => accumulator+= price, 0)

  function submitPayment(nameOnCard, cardNumber, expirationMonth, expirationYear, cvv){
        setShowPopup(true);
    }

    return (
            <div className="row my-5 position-relative">
                <div className="col-12 col-xl-8">
                    <h2 className="shopping-cart-header">Shopping Cart</h2>
                    {savedBooksElement}
                    <div className="d-flex justify-content-between">
                            <h2 className={`${savedBooksElement.length === 0 ? "d-none" : ""} mt-4 shopping-cart-cost`}>Total cost:</h2>
                            <h2 className={`${savedBooksElement.length === 0 ? "d-none" : ""} mt-4 shopping-cart-cost`}>{summaryPrice}$</h2>
                    </div>
                </div>
                <div className={`col-12 col-xl-4 row ${savedBooksElement.length === 0 ? "d-none" : "d-flex"} justify-content-center mx-0 px-lg-0`}>
                    <div className="col-sm-9 col-md-7 col-lg-5 col-xl-12">
                        <PaymentCard submitPayment={submitPayment}/>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <img className={`${savedBooksElement.length === 0 ? "d-block" : "d-none"} w-75`}
                         src="https://cdn.dribbble.com/users/1527146/screenshots/5091984/___-2.jpg" alt="Shopping cart is empty"/>
                </div>
                {showPopup ? <LeaveEmailBeforePayingPopup setShowPopup={setShowPopup}/> : ""}
            </div>
    );
}));

export default ShoppingCart;