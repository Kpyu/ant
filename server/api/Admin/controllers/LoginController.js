import { UserModel } from '../models';
function data(isLogin) {
  return { success: isLogin };
}
export function doLogin(router) {
  router.post('/doLogin', function (ctx, next) {
    console.log('获取参数', ctx.request.body);
    let { userName, password } = ctx.request.body;
    UserModel.checkLogin(userName, password, isLogin => {
      ctx.body = data(isLogin);
    });
  });
}
