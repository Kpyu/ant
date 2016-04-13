
/**
 * 视图路由
 */
export default class View {
  static index(ctx, next) {
    console.log('进入首页');
    console.log(ctx);
    ctx.render('index', ctx.state);
  }
  static login(ctx, next) {
    ctx.render('login', ctx.state);
  }
}
