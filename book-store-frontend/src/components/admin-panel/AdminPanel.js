import React from "react";
import { inject, observer } from "mobx-react";
import "./AdminPanel.css";
import { toJS } from "mobx";
import EditBook from "../edit-book/EditBook";
import AddBook from "../add-book/AddBook";

const AdminPanel = inject("rootStore")(
  observer(props => {
    const books = props.rootStore.adminStore.books;
    const CURRENT_OPERATION = props.rootStore.adminStore.CURRENT_OPERATION.get();
    const setBook = props.rootStore.adminStore.setBook;

    const rows = toJS(books).map(book => {
      return (
        <tr key={book.id}>
          <th scope="row">1</th>
          <td className="d-flex justify-content-center">
            <img
              alt="book cover"
              src={`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/static/${
                book.cover_path
              }?${new Date().getTime()}`}
              className="admin-panel-img-thumbnail"
            ></img>
          </td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <i
              className="fas fa-edit fa-2x text-warning"
              onClick={() => setBook(book)}
            ></i>
          </td>
          <td>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="admin-panel-books-state"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {book.status}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="admin-panel-books-state"
              >
                <button
                  className={
                    book.status === "Published"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  type="button"
                >
                  Published
                </button>
                <button
                  className={
                    book.status === "Moderating"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  type="button"
                >
                  Moderating
                </button>
                <button
                  className={
                    book.status === "Removed"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  type="button"
                >
                  Removed from sale
                </button>
                <button
                  className={
                    book.status === "Deleted"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  type="button"
                >
                  Deleted from store
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    });

    let popup;
    switch (CURRENT_OPERATION) {
      case "EDIT":
        popup = <EditBook />;
        break;
      case "ADD":
        popup = <AddBook />;
        break;
      case "NONE":
      default:
        popup = "";
        break;
    }

    return (
      <div className="my-5 h-100">
        <button type="button" className="btn btn-success">
          Add a book
        </button>
        <div className="table-responsive h-100">
          <table className="table table-bordered table-hover w-auto my-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cover</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Edit</th>
                <th scope="col">State</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
        {popup}
      </div>
    );
  })
);

export default AdminPanel;
