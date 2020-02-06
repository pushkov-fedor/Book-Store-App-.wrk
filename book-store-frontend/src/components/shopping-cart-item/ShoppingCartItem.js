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
            <div className="w-100 row py-3 mx-0 position-relative" style={{boxSizing: "content-box", borderBottom: "1px solid rgba(0,0,0,0.8)"}}>
                <div className="col-12 col-sm-4 col-md-3 d-flex justify-content-center"><img className="w-75" src={props.cover} alt="..."/></div>
                <div className="col-12 col-sm-6 col-md-4 overflow-hidden d-flex flex-column justify-content-center mt-3 mt-sm-0">
                    <h2 style={{fontSize: "1.2rem", fontWeight: "500", textOverflow: "ellipsis", whiteSpace: "pre-wrap", overflow: 'hidden', opacity: "0.8"}}>{props.title}</h2>
                    <h3 style={{fontSize: "1rem", fontWeight: "400", textOverflow: "ellipsis", whiteSpace: "pre-wrap", overflow: 'hidden', opacity: "0.6"}}>by <span>{props.author}</span></h3>
                </div>
                <div className="col-12 col-sm-2 col-md-2 d-flex justify-content-sm-center align-items-center"><h3 className="mb-0" style={{fontSize: "1.5rem", fontWeight: "400", opacity: "0.7"}}>{props.price}$</h3></div>
                <div className="col-12 col-sm-12 col-md-3 py-3 px-sm-0 px-4 d-flex align-items-center justify-content-center">
                    <div className="row">
                        <div className="col-4 d-flex justify-content-center align-items-center" style={{border: "1px solid rgba(0,0,0,0.6)", borderRight: "none", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px", fontWeight: "400"}}
                            onClick={removeFromCart}>
                            <i className="fas fa-minus text-dark"></i>
                        </div>
                        <div className="col-4 d-flex justify-content-center align-items-center text-dark" style={{border: "1px solid rgba(0,0,0,0.6)", borderLeft: "none", borderRight: "none", fontSize: "1.5rem"}}>{Number(props.isStillInCart)}</div>
                        <div className="col-4 d-flex justify-content-center align-items-center" style={{border: "1px solid rgba(0,0,0,0.6)", borderLeft: "none", borderTopRightRadius: "15px", borderBottomRightRadius: "15px", fontWeight: "400"}}
                            onClick={addToCart}>
                            <i className="fas fa-plus text-dark"></i>

                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ShoppingCartItem;