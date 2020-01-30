import React, {useEffect, useState} from 'react';
import BookView from "../book-view/BookView";
import Pagination from "../pagination/Pagination";

function BooksCatalog() {
    const [books, setBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        var books = JSON.parse(localStorage.getItem('books'));
        if (books == null) setSavedBooks([]); else setSavedBooks(books);
    }, [])

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://test.com/books/all/${currentPage}`);
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
                setBooks(JSON.parse(xhr.responseText));
            }
        }
    }, [currentPage]);

    let bookElements = books
        .map((book, index) =>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-10" key={index}>
                <BookView id={book.id} cover={book.cover} title={book.title} author={book.author} price={book.price}
                          savedBooks={savedBooks} setSavedBooks={setSavedBooks}/>
            </div>
        );

    return (
        <div>
            <div className="row d-flex justify-content-center justify-content-sm-start flex-wrap">
                {bookElements}
            </div>
            <Pagination current={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    );
}

export default BooksCatalog;