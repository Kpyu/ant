import { LOGIN } from '../actions/ActionTypes.jsx';

function Login(state = {}, action) {
  switch (action.type) {
    case LOGIN.NAME_TYPING:
      return action.type;
    default:
      return state;
  }
}
