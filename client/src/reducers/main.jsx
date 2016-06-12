import actions from '../actions';
export function collapseＭenu(state = { collapse: false }, action) {
  switch (action.type) {
    case actions.menuActions.MENU_COLLAPSE:
      return Object.assign({}, state, { collapse: false });
    case actions.menuActions.MENU_OPEN:
      return Object.assign({}, state, { collapse: true });
    default:
      return state;
  }
}

