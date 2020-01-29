import React from 'react';
import Searchbar from "../searchbar/Searchbar";
import GenreFilter from "../genrefilter/GenreFilter";

function SearchAndGenreFilter(props) {
    return (
        <div className="row mt-4">
            <div className="col-4">
                <Searchbar/>
            </div>
            <div className="col-1"></div>
            <div className="col-7 d-flex align-items-center">
                <GenreFilter/>
            </div>
        </div>
    );
}

export default SearchAndGenreFilter;