async function doLogin(ctx) {
  console.log('执行登录...');
  ctx.type = 'json';
  ctx.body = { success: true };
}
export default function (router) {
  console.log('进入登录');
  router.use('/admin/doLogin', doLogin);
}
