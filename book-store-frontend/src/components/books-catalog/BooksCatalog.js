import React, {useEffect, useState} from 'react';
import BookView from "../book-view/BookView";

function BooksCatalog(props) {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test.com/books/all');
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status == 200){
                setBooks(JSON.parse(xhr.responseText));
            }
        }
    }, [])

    var bookElements = books.map((book, index) =>
        <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-xs-12" key={index}>
            <BookView cover={book.cover} title={book.title} author={book.author} price={book.price}/>
        </div>
    );

    return (
        <div className="row d-flex justify-content-wrap flex-wrap">
            {bookElements}
        </div>
    );
}

export default BooksCatalog;