import React from 'react'
import {saveAs} from 'file-saver';
import "../book-view/BookView.css";

function MyBookView (props) {


  const downloadFile = (extension) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/myBooks/get/${props.title}.${extension}`);
    xhr.responseType = "blob";
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
        const blob = xhr.response;
        saveAs(blob, `${props.title}.${extension}`);
      }
    }
    xhr.send();
  }

  const dropdown = <div className="btn-group w-100">
    <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
      Download
    </button>
    <div className="dropdown-menu w-100">
      <div className="dropdown-item" onClick={() => downloadFile("pdf")}>As PDF <i className="fas fa-file-pdf"></i></div>
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