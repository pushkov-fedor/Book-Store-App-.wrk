import React from "react";
import { inject, observer } from "mobx-react";
import "./AddBook.css";
import { action, toJS } from "mobx";
import { URL } from "../../constants/Constants";

const EditBook = inject("rootStore")(
  observer(props => {
    // const addBook = props.rootStore.adminStore.addBook;
    // const setAddBook = props.rootStore.adminStore.setAddBook;
    // const uploadFile = props.rootStore.adminStore.uploadFileAddBook;
    // const uploadedCoverAsDataUrlSrc = props.rootStore.adminStore.uploadedCoverAsDataUrlSrcAddBook.get();
    //
    // const onChange = (event) => {
    //   console.log(event.target.id);
    //   let newBook = Object.assign({}, toJS(addBook.get()));
    //   newBook[event.target.id] = event.target.value;
    //   setAddBook(newBook);
    // }

    return (
      <div
        id="add-book-bg"
        className="position-fixed d-flex flex-column justify-content-center align-items-center
    add-book-bg"
        // onClick={(event) => dismissShowAddBookPopup(event)}
      >
        <div className="bg-white p-5 add-book-container">
          <div className="row">
            <div className="col-sm-6 col-12 add-book-left-input-group">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="emailHelp"
                  // value={addBook.get().title} onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  // value={addBook.get().author} onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Author</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  step="0.01"
                  // value={addBook.get().price} onChange={onChange}
                />
              </div>
            </div>
            <div className="col-sm-6 col-12 d-flex flex-column align-items-center">
              <img
                className="edit-book-cover"
                // src={uploadedCoverAsDataUrlSrc == "" ? `${URL}static/${addBook.get().cover_path}` : uploadedCoverAsDataUrlSrc}
              />
              <label type="button" className="btn btn-primary mt-3" for="cover">
                Change cover <i className="fas fa-upload ml-2"></i>
              </label>
              <input
                type="file"
                id="cover"
                className="d-none"
                // onChange={uploadFile}
              />
              <label
                type="button"
                className="btn btn-primary mt-3"
                htmlFor="pdf"
              >
                Upload book pdf <i className="fas fa-upload ml-2"></i>
              </label>
              <input
                type="file"
                id="pdf"
                className="d-none"
                // onChange={uploadFile}
              />
            </div>
          </div>
          <div className="row mx-0 mt-4 pt-3 border-top d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success col-4"
              // onClick={() => sendFile()}
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
