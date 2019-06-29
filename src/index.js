/* eslint-disable import/prefer-default-export */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './js/redux/reducers';
import App from './js/App';
import './index.css';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <BrowserRouter className="app">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
