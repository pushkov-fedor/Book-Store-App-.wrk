import React from "react";
import { inject, observer } from "mobx-react";

const Pagination = inject("rootStore")(
  observer(props => {
    const current = props.rootStore.bookStore.currentPage;
    const setCurrentPage = props.rootStore.bookStore.setCurrentPage;
    const pages = props.rootStore.bookStore.pages.get();
    const pageButtons = [];

    for (let i = 1; i <= pages; i++) {
      pageButtons.push(
        <li
          className={i === current.get() ? "page-item active" : "page-item"}
          key={i}
          onClick={() => {
            setCurrentPage(i);
            window.scrollTo(0, 0);
          }}
        >
          <div className="page-link">{i}</div>
        </li>
      );
    }

    return (
      <nav className="mb-4" style={{ flexShrink: "0" }}>
        <ul className="pagination justify-content-center">
          <li
            className={current.get() === 1 ? "page-item disabled" : "page-item"}
            onClick={() => {
              setCurrentPage(current.get() - 1);
              window.scrollTo(0, 0);
            }}
            style={{ pointerEvents: current.get() === 1 ? "none" : "inherit" }}
          >
            <div className="page-link" tabIndex="-1">
              Previous
            </div>
          </li>
          {pageButtons}
          <li
            className={
              current.get() === pages ? "page-item disabled" : "page-item"
            }
            onClick={() => {
              setCurrentPage(current.get() + 1);
              window.scrollTo(0, 0);
            }}
            style={{
              pointerEvents: current.get() === pages ? "none" : "inherit"
            }}
          >
            <div className="page-link">Next</div>
          </li>
        </ul>
      </nav>
    );
  })
);

export default Pagination;
