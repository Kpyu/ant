import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Main } from '../components/admin';
import Layout from '../components/Layout';
import App from '../containers/App';
import ArticalList from '../components/articalList/';
import Login from '../components/Login/';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ArticalList} />
    <Route path="/login" component={Login} />
    <Route path="/manage" component={Layout}>
      <IndexRoute component={Main} />
    </Route>
  </Route>
);
