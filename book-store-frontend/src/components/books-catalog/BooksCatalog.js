import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import BookView from "../book-view/BookView";
import Pagination from "../pagination/Pagination";
import "./BooksCatalog.css";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

const BooksCatalog = inject("rootStore")(
  observer(props => {
    const books = toJS(props.rootStore.bookStore.books);
    const showPagination = props.rootStore.bookStore.showPagination;

    let bookElements = books.map(book => (
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-10" key={book.id}>
        <BookView
          id={book.id}
          cover={book.cover_path}
          title={book.title}
          author={book.author}
          price={book.price}
        />
      </div>
    ));

    const pagination = showPagination.get() ? <Pagination /> : "";

    return (
      <div className="books-catalog-container">
        <div className="row d-flex justify-content-center justify-content-sm-start flex-wrap books-catalog-elements-container">
          {bookElements}
        </div>
        {pagination}
      </div>
    );
  })
);

export default withRouter(BooksCatalog);
