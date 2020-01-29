import React, {useEffect, useState} from 'react';
import BookView from "../book-view/BookView";
import Pagination from "../pagination/Pagination";

function BooksCatalog() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" key={index}>
                <BookView cover={book.cover} title={book.title} author={book.author} price={book.price}/>
            </div>
        );

    return (
        <div>
            <div className="row d-flex justify-content-wrap flex-wrap">
                {bookElements}
            </div>
            <Pagination current={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    );
}

export default BooksCatalog;