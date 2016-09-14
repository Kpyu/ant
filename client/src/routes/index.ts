import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Main } from '../components/admin';
import Layout from '../components/Layout';
import App from '../containers/App';
import Hello from '../components/Hello/';
import Login from '../components/Login/';

export default (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />
    <Route path="/hello" component={Hello} />
    <Route path="/manage" component={Layout}>
      <IndexRoute component={Main} />
    </Route>
  </Route>
);
