import React from 'react';
import Header from "./components/header/Header";
import SearchAndGenreFilter from "./components/search-and-genrefilter/SearchAndGenreFilter";
import BooksCatalog from "./components/books-catalog/BooksCatalog";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>
      <div className="container">
          <Switch>
              <Route exact path="/">
                  <SearchAndGenreFilter/>
                  <BooksCatalog/>
              </Route>
              <Route path="/shopping-cart">
                  <ShoppingCart/>
              </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
