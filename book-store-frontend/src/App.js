import React from 'react';
import Header from "./components/header/Header";
import SearchAndGenreFilter from "./components/search-and-genrefilter/SearchAndGenreFilter";
import BooksCatalog from "./components/books-catalog/BooksCatalog";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";
import Footer from "./components/footer/Footer";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AfterPaying from "./components/after-paying/AfterPaying";
import { inject, observer } from 'mobx-react'
import MyBooks from './components/my-books/MyBooks'

const App = inject("rootStore")(observer(props => {
  return (
    <Router>
      <Header/>
      <div className="container" style={{flex: '1 0 auto'}}>
          <Switch>
              <Route exact path="/">
                  <SearchAndGenreFilter/>
                  <BooksCatalog/>
              </Route>
              <Route path="/shopping-cart">
                  <ShoppingCart/>
              </Route>
              <Route path="/after-paying">
                  <AfterPaying/>
              </Route>
              <Route path="/my-books">
                  <MyBooks/>
              </Route>
          </Switch>
      </div>
        <Footer/>
    </Router>
  );
}));

export default App;
