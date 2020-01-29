import React, {useEffect, useState} from 'react';
import BookView from "../book-view/BookView";
import Pagination from "../pagination/Pagination";

function BooksCatalog(props) {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(16);

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

    var bookElements = books
        .filter((book, index) => ((currentPage - 1) * booksPerPage <= index && index < currentPage * booksPerPage))
        .map((book, index) =>
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-xs-12" key={index}>
                <BookView cover={book.cover} title={book.title} author={book.author} price={book.price}/>
            </div>
        );

    return (
        <div>
            <div className="row d-flex justify-content-wrap flex-wrap">
                {bookElements}
            </div>
            <Pagination current={currentPage} setCurrentPage={setCurrentPage} booksPerPage={booksPerPage} booksNumber={books.length}/>
        </div>
    );
}

export default BooksCatalog;