import React, {useEffect, useState} from 'react';
import "./GenreFilter.css";

function GenreFilter() {
    const [genres, setGenres] = useState([]);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/books/genres');
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
              const response = JSON.parse(xhr.responseText)
              setGenres(response.genres);
            }
        }
    }, []);

  const genreElements = genres.map((genre, index) =>
    <li className="nav-item" key={index}>
      <div className="nav-link">{genre}</div>
    </li>)
  const genreElementsHover = genres.map((genre, index) =>
    <li className="p-0" key={index}>
      <div className="py-1 nav-link text-white" style={{ backgroundColor: index === 1 ? '#4B5EE8' : '' }}>{genre}</div>
    </li>)

  const genreFilterStyle = {
    visibility: !isHover ? '' : 'hidden',
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    overflow: 'hidden'
  }
  const genreFilterHoverStyle = {
    visibility: isHover ? '' : 'hidden',
    top: '0',
    backgroundColor: 'rgba(0,0,0,.55)',
    listStyleType: 'none',
    zIndex: '100',
    boxShadow: '16px 0 0 #fff'
  }

  return (
        <div className="w-100 position-relative genrefilter" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <ul className="nav nav-pills genrefilter-container" style={genreFilterStyle}>
                {genreElements}
            </ul>
            <ul className="px-0 py-2 position-absolute rounded w-100" style={genreFilterHoverStyle}>
                {genreElementsHover}
            </ul>
        </div>
    );
}
export default GenreFilter;