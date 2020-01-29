import React, {useEffect, useState} from 'react';

function Pagination(props) {

    const [booksCount, setBooksCount] = useState(0);
    const [booksPerPage] = useState(16);

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test.com/books/all/count');
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                setBooksCount(response.booksCount);
            }
        }
    }, [booksCount]);


    const pages = (booksCount % booksPerPage === 0) ?
        (booksCount / booksPerPage) : Math.ceil(booksCount / booksPerPage);
    const pageButtons = [];

    for(let i = 1; i <= pages; i++) {
        pageButtons.push(
            <li className={i === props.current ? "page-item active" : "page-item"} key={i}
                onClick={() => {props.setCurrentPage(i); window.scrollTo(0,0)}}>
                <div className="page-link">{i}</div>
            </li>);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={props.current === 1 ? "page-item disabled" : "page-item"}
                    onClick={() => {props.setCurrentPage(props.current - 1); window.scrollTo(0,0)}}
                    style={{pointerEvents: props.current === 1 ? "none" : "inherit"}}>
                    <div className="page-link" tabIndex="-1">Previous</div>
                </li>
                {pageButtons}
                <li className={props.current === pages ? "page-item disabled" : "page-item"}
                    onClick={() => {props.setCurrentPage(props.current + 1); window.scrollTo(0,0)}}
                    style={{pointerEvents: props.current === pages ? "none" : "inherit"}}>
                    <div className="page-link">Next</div>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;