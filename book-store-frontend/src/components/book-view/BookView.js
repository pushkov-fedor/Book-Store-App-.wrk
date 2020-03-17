import React from "react";
import "./BookView.css";
import { inject, observer } from "mobx-react";
import { URL } from "../../constants/Constants";

const BookView = inject("rootStore")(
  observer(props => {
    const isBookInShoppingCart = props.rootStore.bookStore.isBookInShoppingCart;
    const addBookToLocalStorage =
      props.rootStore.bookStore.addBookToLocalStorage;
    const removeBookFromLocalStorage =
      props.rootStore.bookStore.removeBookFromLocalStorage;

    const button =
      isBookInShoppingCart(props.id) === false ? (
        <button
          type="button"
          className="btn btn-success btn-block py-2 shadow"
          onClick={() =>
            addBookToLocalStorage(
              props.id,
              props.cover,
              props.title,
              props.author,
              props.price
            )
          }
        >
          Add
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-block py-2 shadow"
          onClick={() => removeBookFromLocalStorage(props.id)}
        >
          Remove
        </button>
      );

    return (
      <div className="my-5 mx-xl-3 book-view-container">
        <img
          className="mw-100 book-view-cover"
          src={`${URL}static/${props.cover}`}
          alt="Book cover"
        />
        <h2 className="book-view-title">{props.title}</h2>
        <h3 className="book-view-author-and-price">
          by{" "}
          <span className="book-view-author-and-price-bold">
            {props.author}
          </span>
        </h3>
        <h3 className="book-view-author-and-price">
          Price:{" "}
          <span className="book-view-author-and-price-bold">
            {props.price}$
          </span>
        </h3>
        {button}
      </div>
    );
  })
);

export default BookView;
