import React from 'react';
import BookView from "../book-view/BookView";

function ShoppingCart(props) {

    var books = JSON.parse(localStorage.getItem('books'));
    if (books == null) books = [];

    var savedBooks = books.map((book, index) => <div key={index}>
                <img src={book.cover} alt="..." style={bookCoverStyle}/>
                <h2 style={bookTitleStyle}>{book.title}</h2>
                <h3 style={bookAuthorAndPriceStyle}>by <span style={boldStyle}>{book.author}</span></h3>
                <h3 style={bookAuthorAndPriceStyle}>Price: <span style={boldStyle}>{book.price}$</span></h3>
            </div>);

    return (
        <div>
            {savedBooks}
        </div>
    );
}

const bookCoverStyle = {
    height: "20rem",
    width: "14rem",
    objectFit: "cover",
    boxShadow: "0 4px 4px rgba(0,0,0,0.25"
};

const bookTitleStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: "1.3rem",
    fontWeight: "500",
    marginTop: "1rem"
};

const bookAuthorAndPriceStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: "1.2rem",
    fontWeight: "300"
};

const boldStyle = {
    fontWeight: "400"
};

export default ShoppingCart;