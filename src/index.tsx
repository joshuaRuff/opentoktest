/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { resetContext, Provider } from 'kea';

import '@opentok/client';

import App from './app/App';
import './index.css';
import './polyfills';

resetContext({
  createStore: {},
  plugins: [],
});

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
