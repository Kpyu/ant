import { User } from '../models';
function data() {
  return { success: true };
}
export function doLogin(router) {
  console.log('进入登录');
  router.post('/admin/doLogin', function (ctx, next) {
    console.log(ctx);
    ctx.body = data();
    next();
  });
}
