const menuData = require('../../../../data/menu.json');
export function loadMenu(router) {
  router.get('/loadMenu', function (ctx, next) {
    ctx.body = menuData;
  });
}
