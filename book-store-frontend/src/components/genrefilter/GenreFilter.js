import React, {useEffect, useState} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import "./GenreFilter.css";

function GenreFilter() {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test.com/books/genres');
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                setGenres(response.genres);
            }
        }
    }, []);

    var genreElements = genres.map((genre, index) =>
        <li className="nav-item" key={index}>
            <div className="nav-link">{genre}</div>
        </li>)

    return (
        <ScrollContainer vertical={false} horizontal={true} hideScrollbars={true}>
            <ul className="nav nav-pills genrefilter-container" style={{whiteSpace: "nowrap", flexWrap: "nowrap"}}>
                {genreElements}
            </ul>
        </ScrollContainer>
    );
}

export default GenreFilter;