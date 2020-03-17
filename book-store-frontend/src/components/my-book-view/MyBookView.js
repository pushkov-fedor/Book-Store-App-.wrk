import React from "react";
import "../book-view/BookView.css";
import { saveAs } from "file-saver";
import { URL } from "../../constants/Constants";

function MyBookView(props) {
  const downloadFile = extension => {
    fetch(`${URL}api/myBooks/get/${props.title}.${extension}`, {
      method: "GET",
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "application/json"
      }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const dropdown = (
    <div className="btn-group w-100">
      <button
        type="button"
        className="btn btn-warning dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Download
      </button>
      <div className="dropdown-menu w-100">
        <div className="dropdown-item" onClick={() => downloadFile("pdf")}>
          As PDF <i className="fas fa-file-pdf"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-5 mx-xl-3 book-view-container">
      <img
        className="mw-100 book-view-cover"
        src={props.cover}
        alt="Book cover"
      />
      <h2 className="book-view-title">{props.title}</h2>
      <h3 className="book-view-author-and-price">
        by{" "}
        <span className="book-view-author-and-price-bold">{props.author}</span>
      </h3>
      {dropdown}
    </div>
  );
}

export default MyBookView;
