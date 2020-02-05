import React, {useEffect, useState} from 'react';

function ShoppingCartItem(props) {

    function removeFromCart(){
        var booksInCartUpdate = props.booksInCart.map(bookInCart => {
            if (bookInCart.id != props.id) {
                return bookInCart;
            } else {
                const copy = Object.assign({}, bookInCart);
                copy.isStillInCart = false;
                return copy;
            }
        });
        props.setBooksInCart(booksInCartUpdate);
    }

    function addToCart(){
        var booksInCartUpdate = props.booksInCart.map(bookInCart => {
            if (bookInCart.id != props.id) {
                return bookInCart;
            } else {
                const copy = Object.assign({}, bookInCart);
                copy.isStillInCart = true;
                return copy;
            }
        });
        props.setBooksInCart(booksInCartUpdate);
    }

    return (
            <div className="w-100 row py-4 mx-0" style={{boxSizing: "content-box", height: "180px", borderBottom: "1px solid rgba(0,0,0,0.8)"}}>
                <div className="col-3 h-100 d-flex justify-content-center"><img className="w-75" src={props.cover} alt="..."/></div>
                <div className="col-3 h-100 overflow-hidden d-flex flex-column justify-content-center">
                    <h2 style={{fontSize: "1.2rem", fontWeight: "500", textOverflow: "ellipsis", whiteSpace: "pre-wrap", overflow: 'hidden', opacity: "0.8"}}>{props.title}</h2>
                    <h3 style={{fontSize: "1rem", fontWeight: "400", textOverflow: "ellipsis", whiteSpace: "pre-wrap", overflow: 'hidden', opacity: "0.6"}}>by <span>{props.author}</span></h3>
                </div>
                <div className="col-3 h-100 d-flex justify-content-center align-items-center"><h3 style={{fontSize: "1.5rem", fontWeight: "400", opacity: "0.7"}}>{props.price}$</h3></div>
                <div className="col-3 py-4 h-100 row d-flex align-items-center">
                    <div className="col-4 h-25 d-flex justify-content-center align-items-center" style={{border: "1px solid rgba(0,0,0,0.6)", borderRight: "none", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", fontWeight: "400"}}
                        onClick={removeFromCart}>
                        <i className="fas fa-minus text-dark"></i>
                    </div>
                    <div className="col-4 h-25 d-flex justify-content-center align-items-center text-dark" style={{border: "1px solid rgba(0,0,0,0.6)", borderLeft: "none", borderRight: "none", fontSize: "1.5rem"}}>{Number(props.isStillInCart)}</div>
                    <div className="col-4 h-25 d-flex justify-content-center align-items-center" style={{border: "1px solid rgba(0,0,0,0.6)", borderLeft: "none", borderTopRightRadius: "20px", borderBottomRightRadius: "20px", fontWeight: "400"}}
                        onClick={addToCart}>
                        <i className="fas fa-plus text-dark"></i>

                    </div>
                </div>
            </div>
    );
}

export default ShoppingCartItem;