import React from 'react'
import "../book-view/BookView.css";

function MyBookView (props) {


  const dropdown = <div className="btn-group w-100">
    <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
      Download
    </button>
    <div className="dropdown-menu w-100">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
    </div>
  </div>;

  return (
    <div className="my-5 mx-xl-3 book-view-container">
      <img className="mw-100 book-view-cover" src={props.cover} alt="Book cover"/>
      <h2 className="book-view-title">{props.title}</h2>
      <h3 className="book-view-author-and-price">by <span className="book-view-author-and-price-bold">{props.author}</span></h3>
      {dropdown}
    </div>
  )
}

export default MyBookView