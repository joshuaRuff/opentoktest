/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallPage from './components/callPage/CallPage';

import LandingPage from './components/landingPage/LandingPage';

const App: React.FC = () => {
  console.log('App');

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/session/:sessionId">
          <CallPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
