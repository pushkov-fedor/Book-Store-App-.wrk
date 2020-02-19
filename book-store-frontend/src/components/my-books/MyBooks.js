import React from 'react';
import {withRouter} from "react-router-dom";
import { inject, observer } from 'mobx-react';
import queryString from 'querystring';
import { toJS } from 'mobx'
import "../books-catalog/BooksCatalog.css";
import MyBookView from '../my-book-view/MyBookView'

const MyBooks =  inject("rootStore")(observer((props) => {
  const email = queryString.parse(props.location.search.substr(1)).email;

  const setEmail = props.rootStore.myBooksStore.setCustomerEmail;
  const books = props.rootStore.myBooksStore.books;
  setEmail(email);

  let bookElements = toJS(books)
    .map(book =>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-10" key={book.id}>
        <MyBookView id={book.id} cover={book.cover} title={book.title} author={book.author} price={book.price}/>
      </div>
    );

  return (
    <div className="books-catalog-container">
      <div className="row d-flex justify-content-center justify-content-sm-start flex-wrap books-catalog-elements-container">
        {bookElements}
      </div>
    </div>
  )
}))

export default withRouter(MyBooks);