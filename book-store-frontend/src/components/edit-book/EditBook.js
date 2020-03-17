import React from "react";
import { inject, observer } from "mobx-react";
import "./EditBook.css";
import { toJS } from "mobx";
import { URL } from "../../constants/Constants";

const EditBook = inject("rootStore")(
  observer(props => {
    const book = props.rootStore.adminStore.book;
    const setBook = props.rootStore.adminStore.setBook;
    const uploadedCoverAsDataUrlSrc = props.rootStore.adminStore.uploadedCoverAsDataUrlSrc.get();
    const uploadFile = props.rootStore.adminStore.uploadFile;
    const sendFile = props.rootStore.adminStore.sendFile;
    const dismissPopup = props.rootStore.adminStore.dismissPopup;

    // let id = book.get().id;
    // let title = book.get().title;
    // let author = book.get().author;
    // let price = book.get().price;
    // let cover_path = book.get().cover_path;
    // let book_pdf_path = book.get().book_pdf_path;
    // let status = book.get().status;

    const onChange = event => {
      console.log(event.target.id);
      let newBook = Object.assign({}, toJS(book.get()));
      newBook[event.target.id] = event.target.value;
      setBook(newBook);
    };

    return (
      <div
        id="edit-book-bg"
        className="position-fixed d-flex flex-column justify-content-center align-items-center
    edit-book-bg"
        onClick={event => dismissPopup(event)}
      >
        <div className="bg-white p-5 edit-book-container">
          <div className="row">
            <div className="col-sm-6 col-12 edit-book-left-input-group">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="emailHelp"
                  value={book.get().title}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={book.get().author}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Author</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  step="0.01"
                  value={book.get().price}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-sm-6 col-12 d-flex flex-column align-items-center">
              <img
                alt="book-cover"
                className="edit-book-cover"
                src={
                  uploadedCoverAsDataUrlSrc === ""
                    ? `${URL}static/${
                        book.get().cover_path
                      }?${new Date().getSeconds()}`
                    : uploadedCoverAsDataUrlSrc
                }
              />
              <label type="button" className="btn btn-primary mt-3" for="cover">
                Change cover <i className="fas fa-upload ml-2"></i>
              </label>
              <input
                type="file"
                id="cover"
                className="d-none"
                onChange={uploadFile}
              />
            </div>
          </div>
          <div className="row mx-0 mt-4 pt-3 border-top d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success col-4"
              onClick={() => sendFile()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  })
);

export default EditBook;
