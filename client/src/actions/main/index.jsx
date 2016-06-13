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

function menuLoaded(data) {
  return {
    type: menuActions.MENU_LOADED,
    menus: data
  };
}

export function menuLoad() {
  return dispatch => {
    dispatch(beiginLoadMenu());
    console.log(dataApi);
    dataApi.loadMenu()
      .then(
      function (result) {
        dispatch(menuLoaded(result.data));
      })
      .catch(function (response) {
        console.log(response);
      });
  };
}
