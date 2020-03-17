import React, { useState } from "react";
import "./GenreFilter.css";
import { inject, observer } from "mobx-react";

const GenreFilter = inject("rootStore")(
  observer(props => {
    const genres = props.rootStore.bookStore.genres.get();
    const [isHover, setIsHover] = useState(false);
    const genreElements = genres.map((genre, index) => (
      <li className="nav-item" key={index}>
        <div className="nav-link">{genre}</div>
      </li>
    ));
    const genreElementsHover = genres.map((genre, index) => (
      <li className="p-0" key={index}>
        <div className="py-1 nav-link text-white genre-item">{genre}</div>
      </li>
    ));

    const genreFilterStyle = {
      visibility: !isHover ? "" : "hidden",
      whiteSpace: "nowrap",
      flexWrap: "nowrap",
      overflow: "hidden"
    };
    const genreFilterHoverStyle = {
      visibility: isHover ? "" : "hidden",
      top: "0",
      backgroundColor: "rgba(0,0,0,.55)",
      listStyleType: "none",
      zIndex: "100",
      boxShadow: "16px 0 0 #fff"
    };

    return (
      <div
        className="w-100 position-relative genrefilter"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <ul
          className="nav nav-pills genrefilter-container"
          style={genreFilterStyle}
        >
          {genreElements}
        </ul>
        <ul
          className="px-0 py-2 position-absolute rounded w-100"
          style={genreFilterHoverStyle}
        >
          {genreElementsHover}
        </ul>
      </div>
    );
  })
);
export default GenreFilter;
