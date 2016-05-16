import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import Login from './login';


const rootReducer = combineReducers(Object.assign(
  {
    routing: routerReducer
  },
  {
    form: formReducer,
    login: Login
  }
));

export default rootReducer;
