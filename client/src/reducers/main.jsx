import * as actions from '../actions';
console.log(actions);

function collapseＭenu(state = {}, action) {
  switch (action.type) {
    case LOGIN.NAME_TYPING:
      return action.type;
    default:
      return state;
  }
}
