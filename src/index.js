import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));