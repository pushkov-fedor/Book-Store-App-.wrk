import React, {useState} from 'react';
import ShoppingCartItem from "../shopping-cart-item/ShoppingCartItem";
import PaymentCard from "../payment-card/PaymentCard";

function ShoppingCart(props) {

    var books = JSON.parse(localStorage.getItem('books'));
    if (books == null) books = [];

    const [booksInCart, setBooksInCart] = useState(books.map(book => Object.assign({}, book, {isStillInCart: true})));

    var savedBooksElement = booksInCart.map((book, index) =>
        <ShoppingCartItem key={book.id} cover={book.cover} id={book.id} title={book.title} author={book.author} price={book.price}
                          isStillInCart={book.isStillInCart} booksInCart={booksInCart} setBooksInCart={setBooksInCart}/>);
    var summaryPrice = booksInCart.filter(book => book.isStillInCart).map(book => book.price).reduce((accumulator, price)=>accumulator+=price,0);

    return (
        <div>
            <div className="row my-5">
                <div className="col-12 col-xl-8">
                    <h2 style={{fontWeight: "500", fontSize: "1.5rem"}}>Shopping Cart</h2>
                    {savedBooksElement}
                    <div className="d-flex justify-content-between">
                        <h2 className="mt-4" style={{fontWeight: "500", fontSize: "1.3rem"}}>Total cost:</h2>
                        <h2 className="mt-4" style={{fontWeight: "500", fontSize: "1.3rem"}}>{summaryPrice}$</h2>
                    </div>
                </div>
                <div className="col-12 col-xl-4 w-sm-100 w-75 row d-flex justify-content-center px-lg-0">
                    <div className="col-sm-9 col-md-7 col-lg-5 col-xl-12">
                        <PaymentCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;