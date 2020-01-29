import React from 'react';

function Pagination(props) {

    var pages = (props.booksNumber % props.booksPerPage == 0) ?
        (props.booksNumber / props.booksPerPage) : Math.ceil(props.booksNumber / props.booksPerPage);

    var pageButtons = [];

    for(let i = 1; i <= pages; i++) {
        pageButtons.push(
            <li className={i == props.current ? "page-item active" : "page-item"} onClick={() => props.setCurrentPage(i)}>
                <a className="page-link" href="#">{i}</a>
            </li>);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={props.current == 1 ? "page-item disabled" : "page-item"} onClick={() => props.setCurrentPage(props.current - 1)}
                    style={{pointerEvents: props.current == 1 ? "none" : "inherit"}}>
                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                {pageButtons}
                <li className={props.current == pages ? "page-item disabled" : "page-item"} onClick={() => props.setCurrentPage(props.current + 1)}
                    style={{pointerEvents: props.current == pages ? "none" : "inherit"}}>
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;