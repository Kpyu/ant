import { dataApi } from '../../util';
export const menuActions = {
  MENU_OPEN: 'MENU_OPEN',
  MENU_COLLAPSE: 'MENU_COLLAPSE',
  MENU_LOADING: 'MENU_LOADING',
  MENU_LOADED: 'MENU_LOADED'
  // MENU_LOADING: 'MENU_LOADING'
};

export function menuOpen() {
  return {
    type: menuActions.MENU_OPEN
  };
}
export function menuCollapse() {
  return {
    type: menuActions.MENU_COLLAPSE
  };
}

function beiginLoadMenu(params) {
  return {
    type: menuActions.MENU_LOADING
  };
}

export function menuLoad() {
  return dispatch => {
    dispatch(beiginLoadMenu());
    // data = await dataApi.loadMenu()
  };
}
