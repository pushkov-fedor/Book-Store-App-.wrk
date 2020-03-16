import React from "react";
import "./ShoppingCartItem.css";
import { URL } from "../../constants/Constants";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

const ShoppingCartItem = inject("rootStore")(
  observer(props => {
    function removeFromCart() {
      const booksInCartUpdate = props.booksInCart.map(bookInCart => {
        if (bookInCart.id !== props.id) {
          return bookInCart;
        } else {
          const copy = Object.assign({}, bookInCart);
          copy.isStillInCart = false;
          return copy;
        }
      });
      props.removeBookFromLocalStorage(props.id);
      props.setBooksInCart(booksInCartUpdate);
    }

    function addToCart() {
      const booksInCartUpdate = props.booksInCart.map(bookInCart => {
        if (bookInCart.id !== props.id) {
          return bookInCart;
        } else {
          const copy = Object.assign({}, bookInCart);
          copy.isStillInCart = true;
          return copy;
        }
      });
      props.addBookToLocalStorage(
        props.id,
        props.cover,
        props.title,
        props.author,
        props.price
      );
      props.setBooksInCart(booksInCartUpdate);
    }

    return (
      <div className="w-100 row py-3 mx-0 position-relative shopping-cart-item-container">
        <div className="col-12 col-sm-4 col-md-3 text-center">
          <img
            className="w-75 b shopping-cart-item-book-cover"
            src={`${URL}static/${props.cover}`}
            alt="..."
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 overflow-hidden d-flex flex-column justify-content-center mt-3 mt-sm-0">
          <h2 className="shopping-cart-item-title">{props.title}</h2>
          <h3 className="shopping-cart-item-author">
            by <span>{props.author}</span>
          </h3>
        </div>
        <div className="col-12 col-sm-2 col-md-2 d-flex justify-content-sm-center align-items-center">
          <h3 className="mb-0 shopping-cart-item-price">{props.price}$</h3>
        </div>
        <div className="col-12 col-sm-12 col-md-3 py-3 px-sm-0 px-4 d-flex align-items-center justify-content-center">
          <div className="row shopping-cart-items-buttons">
            <div
              className="col-4 d-flex justify-content-center align-items-center shopping-cart-item-remove-button"
              onClick={removeFromCart}
            >
              <i className="fas fa-minus text-dark" />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center text-dark shopping-cart-item-count">
              {Number(props.isStillInCart)}
            </div>
            <div
              className="col-4 d-flex justify-content-center align-items-center shopping-cart-item-add-button"
              onClick={addToCart}
            >
              <i className="fas fa-plus text-dark" />
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default ShoppingCartItem;
