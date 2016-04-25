import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import Hello from '../components/Hello/';
import Login from '../components/Login/';

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/hello" component={Hello} />
      <Route path="/login" component={Login} />
    </Router>
  );
}
