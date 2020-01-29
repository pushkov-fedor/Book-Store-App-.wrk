import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import "./GenreFilter.css";

function GenreFilter(props) {
    return (
        <ScrollContainer vertical={false} horizontal={true} hideScrollbars={true}>
            <ul className="nav nav-pills genrefilter-container" style={{whiteSpace: "nowrap", flexWrap: "nowrap"}}>
                <li className="nav-item">
                    <a className="nav-link selected" href="#">All Genres</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Science</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Fiction</a>
                </li>
            </ul>
        </ScrollContainer>
    );
}

export default GenreFilter;