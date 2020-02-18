import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import {bookStore} from './stores/BookStore'
import './index.css';
import App from './App';

ReactDOM.render(<Provider bookStore={bookStore}><App/></Provider>, document.getElementById('root'));
