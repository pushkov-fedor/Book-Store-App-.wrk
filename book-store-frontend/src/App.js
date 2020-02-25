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
import Authentication from './components/authentication/Authentication'

const App = inject("rootStore")(observer(props => {
    const showAuthPopup = props.rootStore.authStore.showAuthPopup;
    const auth = showAuthPopup.get() ? <Authentication/> : "";
  return (
    <Router>
      <Header/>
      <div className="container" style={{flex: '1 0 auto'}}>
          <Switch>
              <Route exact path="/">
                  <SearchAndGenreFilter/>
                  <BooksCatalog/>
                  {auth}
              </Route>
              <Route path="/shopping-cart">
                  <ShoppingCart/>
                  {auth}
              </Route>
              <Route path="/after-paying">
                  <AfterPaying/>
                  {auth}
              </Route>
              <Route path="/my-books">
                  <MyBooks/>
                  {auth}
              </Route>
          </Switch>
      </div>
        <Footer/>
    </Router>
  );
}));

export default App;
