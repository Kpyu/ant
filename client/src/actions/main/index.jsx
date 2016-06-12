export const menuActions = {
  MENU_OPEN: 'MENU_OPEN',
  MENU_COLLAPSE: 'MENU_COLLAPSE'
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
