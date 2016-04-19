import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers(Object.assign(
  {},
  {
    form: formReducer
  }
));

export default rootReducer;
