import React from 'react'
import { inject, observer } from 'mobx-react'
import "./AdminPanel.css"
import { toJS } from 'mobx'
import EditBook from '../edit-book/EditBook'
import AddBook from '../add-book/AddBook'

const AdminPanel = inject("rootStore")(observer((props) => {

  const books = props.rootStore.adminStore.books;
  const editedBook = props.rootStore.adminStore.editedBook;
  const setEditedBook = props.rootStore.adminStore.setEditedBook;

  const showAddBookPopup = props.rootStore.adminStore.showAddBookPopup;
  const isShowAddBookPopup = props.rootStore.adminStore.isShowAddBookPopup.get();

  const rows = toJS(books).map(book => {
    return (
    <tr key={book.id}>
      <th scope="row">1</th>
      <td className="d-flex justify-content-center"><img src={`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/static/${book.cover_path}?${new Date().getTime()}`} className="admin-panel-img-thumbnail"></img></td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td><i className="fas fa-edit fa-2x text-warning" onClick={() => setEditedBook(book)}></i></td>
      <td>
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" id="admin-panel-books-state"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {book.status}
          </button>
          <div className="dropdown-menu" aria-labelledby="admin-panel-books-state">
            <button className={book.status === "Published" ? "dropdown-item active" : "dropdown-item"}
                    type="button">Published</button>
            <button className={book.status === "Moderating" ? "dropdown-item active" : "dropdown-item"}
                    type="button">Moderating</button>
            <button className={book.status === "Removed" ? "dropdown-item active" : "dropdown-item"}
                    type="button">Removed from sale</button>
            <button className={book.status === "Deleted" ? "dropdown-item active" : "dropdown-item"}
                    type="button">Deleted from store</button>
          </div>
        </div>
      </td>
    </tr>);
  });

  const editBookPopup = editedBook.get() == null ? "" : <EditBook/>;
  const addBookPopup = isShowAddBookPopup ? <AddBook/> : "";

  console.log(isShowAddBookPopup);

  return (
    <div className="my-5 h-100">
      <button type="button" className="btn btn-success" onClick={showAddBookPopup}>Add a book</button>
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
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
      {editBookPopup}
      {addBookPopup}
    </div>
  )
}))

export default AdminPanel