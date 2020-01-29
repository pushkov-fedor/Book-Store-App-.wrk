import React from 'react';
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import GenreFilter from "./components/genrefilter/GenreFilter";
import BooksCatalog from "./components/books-catalog/BooksCatalog";

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="container">
          <div className="row mt-4">
              <div className="col-4">
                  <Searchbar/>
              </div>
              <div className="col-1"></div>
              <div className="col-7 d-flex align-items-center">
                  <GenreFilter/>
              </div>
          </div>
          <BooksCatalog/>
      </div>
    </div>
  );
}

export default App;
