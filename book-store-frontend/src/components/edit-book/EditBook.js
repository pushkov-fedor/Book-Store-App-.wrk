import React from 'react'
import { inject, observer } from 'mobx-react'
import "./EditBook.css";
import { action, toJS } from 'mobx'
import {URL} from '../../constants/Constants'

const EditBook = inject("rootStore")(observer((props) => {
  const editedBook = props.rootStore.adminStore.editedBook;
  const setEditedBook = props.rootStore.adminStore.setEditedBook;
  const uploadedCoverAsDataUrlSrc = props.rootStore.adminStore.uploadedCoverAsDataUrlSrc.get();
  const uploadFile = props.rootStore.adminStore.uploadFile;
  const sendFile = props.rootStore.adminStore.sendFile;
  const toggleShowEditBookPopup = props.rootStore.adminStore.toggleShowEditBookPopup;

  let id = editedBook.get().id;
  let title = editedBook.get().title;
  let author = editedBook.get().author;
  let price = editedBook.get().price;
  let cover_path = editedBook.get().cover_path;
  let book_pdf_path = editedBook.get().book_pdf_path;
  let status = editedBook.get().status;


  const onChange = (event) => {
      console.log(event.target.id);
      let newBook = Object.assign({}, toJS(editedBook.get()));
      newBook[event.target.id] = event.target.value;
      setEditedBook(newBook);
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
                     value={editedBook.get().title} onChange={onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" className="form-control" id="author"
                     value={editedBook.get().author} onChange={onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="price">Author</label>
              <input type="number" className="form-control" id="price" step="0.01"
                     value={editedBook.get().price} onChange={onChange}/>
            </div>
          </div>
          <div className="col-sm-6 col-12 d-flex flex-column align-items-center">
            <img className="edit-book-cover"
              src={uploadedCoverAsDataUrlSrc === "" ? `${URL}static/${editedBook.get().cover_path}` : uploadedCoverAsDataUrlSrc}/>
            <label type="button" className="btn btn-primary mt-3" for="cover">
              Change cover   <i className="fas fa-upload ml-2"></i>
            </label>
            <input type="file" id="cover" className="d-none" onChange={uploadFile} />
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