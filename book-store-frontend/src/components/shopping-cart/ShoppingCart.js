import React from 'react';

function ShoppingCart(props) {

    var books = JSON.parse(localStorage.getItem('books'));
    if (books == null) books = [];

    var savedBooks = books.map((book, index) => <div key={index}>{`${book.cover} | ${book.title} | ${book.author} | ${book.price}`}</div>);

    return (
        <div>
            {savedBooks}
        </div>
    );
}

export default ShoppingCart;