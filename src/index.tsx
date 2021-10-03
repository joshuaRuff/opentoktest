/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { resetContext, Provider } from 'kea';

import '@opentok/client';

import App from './app/App';
import './index.css';
import './polyfills';

import { SERVER_BASE_URL } from './config';
import { Credentials } from './common/types';

function renderApp(credentials: Credentials) {
  ReactDOM.render(
    <Provider>
      <App credentials={credentials} />
    </Provider>,
    document.getElementById('root'),
  );
}

resetContext({
  createStore: {
    // options for redux (e.g. middleware, reducers, ...)
  },
  plugins: [
    // additional kea plugins
  ],
});

if (SERVER_BASE_URL) {
  fetch(`${SERVER_BASE_URL}/session`)
    .then(data => data.json())
    .then(renderApp)
    .catch(err => {
      console.error('Failed to get session credentials', err);
    });
}
