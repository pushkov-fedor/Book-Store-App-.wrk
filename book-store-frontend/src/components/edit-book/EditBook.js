import React from 'react'
import { inject, observer } from 'mobx-react'
import "./EditBook.css";

const EditBook = inject("rootStore")(observer((props) => {
  const toggleShowEditBookPopup = props.rootStore.adminStore.toggleShowEditBookPopup;
  const editedBook = props.rootStore.adminStore.editedBook;

  let file = null;

  const sendFile = () => {
    const data = new FormData();
    data.append('file', file);
    console.log(file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://test.com/api/admin/books/update');
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
        console.log('success');
      }
    };
    xhr.send(data);
  }

  return (
    <div id="edit-book-bg" className="position-fixed d-flex flex-column justify-content-center align-items-center
    edit-book-bg"
         onClick={(event) => toggleShowEditBookPopup(event)}>
      <div className="bg-white p-5 edit-book-container">
        <div className="row">
          <div className="col-sm-6 col-12 edit-book-left-input-group">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" aria-describedby="emailHelp"
                     value={editedBook.get().title}/>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" className="form-control" id="author"
                     value={editedBook.get().author}/>
            </div>
            <div className="form-group">
              <label htmlFor="price">Author</label>
              <input type="number" className="form-control" id="price" step="0.01"
                     value={editedBook.get().price}/>
            </div>
          </div>
          <div className="col-sm-6 col-12 d-flex flex-column align-items-center">
            <img className="edit-book-cover"
              src={`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/static/${editedBook.get().cover_path}`}></img>
            <label type="button" className="btn btn-primary mt-3" for="edit-book-cover-input">
              Change cover   <i className="fas fa-upload ml-2"></i>
            </label>
            <input type="file" id="edit-book-cover-input" className="d-none" onChange={(event) => file = event.target.files[0]} />
          </div>
        </div>
        <div className="row mx-0 mt-4 pt-3 border-top d-flex justify-content-center">
          <button type="submit" className="btn btn-success col-4" onClick={() => sendFile()}>Submit</button>
        </div>
      </div>
    </div>
  )
}))

export default EditBook