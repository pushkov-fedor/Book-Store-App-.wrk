import React, {useEffect, useState} from 'react';

function BookView(props) {

    var [isBookInShoppingCart, setIsBookInShoppingCart] = useState(false);

    useEffect(() => {
        var isBookInShoppingCart = props.savedBooks.find(book => book.id === props.id);
        setIsBookInShoppingCart(Boolean(isBookInShoppingCart));
    }, [props.savedBooks.length]);

    function addToShoppingCart(id, cover, title, author, price){
        var booksCopy = props.savedBooks.slice();
        booksCopy.push({id, cover, title, author, price});
        localStorage.setItem('books', JSON.stringify(booksCopy));
        props.setSavedBooks(booksCopy);
        setIsBookInShoppingCart(true);
    }

    function removeFromShoppingCart(id){
        var books = props.savedBooks.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
        props.setSavedBooks(books);
        setIsBookInShoppingCart(false);
    }

    var button = (isBookInShoppingCart === false) ?
        (<button type="button" className="btn btn-success btn-block py-2 shadow"
                 onClick={() => addToShoppingCart(props.id, props.cover, props.title, props.author, props.price)}>Add</button>) :
        (<button type="button" className="btn btn-primary btn-block py-2 shadow"
                onClick={() => removeFromShoppingCart(props.id)}>Remove</button>);

    return (
        <div className="my-5 mx-xl-3" style={bookFontColorStyle}>
            <img className="mw-100" src={props.cover} alt="..." style={bookCoverStyle}/>
            <h2 style={bookTitleStyle}>{props.title}</h2>
            <h3 style={bookAuthorAndPriceStyle}>by <span style={boldStyle}>{props.author}</span></h3>
            <h3 style={bookAuthorAndPriceStyle}>Price: <span style={boldStyle}>{props.price}$</span></h3>
            {button}
        </div>
    );
}

const bookFontColorStyle = {
    color: "rgba(0,0,0,0.8)"
};

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

export default BookView;