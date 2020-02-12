import React from 'react';
import Searchbar from "../searchbar/Searchbar";
import GenreFilter from "../genrefilter/GenreFilter";

function SearchAndGenreFilter() {
    return (
        <div className="row px-4 px-sm-0 w-100 mt-4 mx-0">
            <div className="col-12 col-md-5">
                <Searchbar/>
            </div>
            <div className="col-12 col-md-1 mt-3 mt-md-0"/>
            <div className="col-12 col-md-6 d-flex align-items-center">
                <GenreFilter/>
            </div>
        </div>
    );
}

export default SearchAndGenreFilter;