import React from 'react'
import { inject, observer } from 'mobx-react'
import "./AdminPanel.css"

const AdminPanel = inject("rootStore")(observer((props) => {

  return (
    <div className="mt-5">
      <button type="button" className="btn btn-success">Add a book</button>
      <div className="table-responsive">
        <table className="table table-bordered table-hover w-auto my-3">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">State</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="admin-panel-books-state"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </button>
                <div className="dropdown-menu" aria-labelledby="admin-panel-books-state">
                  <button className="dropdown-item" type="button">Published</button>
                  <button className="dropdown-item" type="button">Removed from sale</button>
                  <button className="dropdown-item" type="button">Deleted from store</button>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}))

export default AdminPanel