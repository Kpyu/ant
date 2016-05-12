import React from 'react';
import { Router } from 'react-router';
import routes from './index';
export default function configureRoutes(history) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
