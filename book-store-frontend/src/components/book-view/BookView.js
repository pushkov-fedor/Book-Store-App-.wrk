import React, {useEffect, useState} from 'react';
import "./BookView.css";
import { inject, observer } from 'mobx-react'

const BookView = inject("rootStore")( observer(props => {

    const savedBooks = props.rootStore.bookStore.savedBooks;
    const setSavedBooks = props.rootStore.bookStore.setSavedBooks;

    const [isBookInShoppingCart, setIsBookInShoppingCart] = useState(false)
    useEffect(() => {
        const isBookInShoppingCart = savedBooks.find(book => book.id === props.id)
        setIsBookInShoppingCart(Boolean(isBookInShoppingCart));
    }, [savedBooks.length]);

    function addToShoppingCart(id, cover, title, author, price){
        const booksCopy = savedBooks.slice()
        booksCopy.push({id, cover, title, author, price});
        localStorage.setItem('books', JSON.stringify(booksCopy));
        setSavedBooks(booksCopy);
        setIsBookInShoppingCart(true);
    }

    function removeFromShoppingCart(id){
        const books = savedBooks.filter(book => book.id !== id)
        localStorage.setItem('books', JSON.stringify(books));
        setSavedBooks(books);
        setIsBookInShoppingCart(false);
    }

    const button = (isBookInShoppingCart === false) ?
      (<button type="button" className="btn btn-success btn-block py-2 shadow"
               onClick={() => addToShoppingCart(props.id, props.cover, props.title, props.author, props.price)}>Add</button>) :
      (<button type="button" className="btn btn-primary btn-block py-2 shadow"
               onClick={() => removeFromShoppingCart(props.id)}>Remove</button>)

    return (
        <div className="my-5 mx-xl-3 book-view-container">
            <img className="mw-100 book-view-cover"
                 src={`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/static/${props.cover}`}
                 alt="Book cover"/>
            <h2 className="book-view-title">{props.title}</h2>
            <h3 className="book-view-author-and-price">by <span className="book-view-author-and-price-bold">{props.author}</span></h3>
            <h3 className="book-view-author-and-price">Price: <span className="book-view-author-and-price-bold">{props.price}$</span></h3>
            {button}
        </div>
    );
}));

export default BookView;