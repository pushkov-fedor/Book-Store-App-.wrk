import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import {rootStore} from './stores/RootStore'
import {bookStore} from './stores/BookStore';
import './index.css';
import App from './App';

ReactDOM.render(<Provider rootStore={rootStore}><App/></Provider>, document.getElementById('root'));
