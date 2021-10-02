
import React from 'react';
import ReactDOM from 'react-dom';
import '@opentok/client';

import App from './App';
import './index.css';
import './polyfills';

import { SERVER_BASE_URL } from './config';

function renderApp(credentials) {
  ReactDOM.render(
    <App credentials={credentials} />,
    document.getElementById('root')
  );
}

if (SERVER_BASE_URL) {
    fetch(SERVER_BASE_URL + '/session')
        .then(data => data.json())
        .then(renderApp)
        .catch((err) => {
            console.error('Failed to get session credentials', err);
            alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
        }
    );
} 