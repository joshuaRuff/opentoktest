/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallPage from './components/callPage/CallPage';

import LandingPage from './components/landingPage/LandingPage';
import WaitingRoom from './components/waitingRoom/WaitingRoom';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/join/:sessionId">
        <WaitingRoom />
      </Route>
      <Route path="/session/:sessionId">
        <CallPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
