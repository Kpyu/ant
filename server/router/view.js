
/**
 * 视图路由
 */
export default class View {
  static index(ctx, next) {
    ctx.render('index');
  }
  static login(ctx, next) {
    ctx.render('login', ctx.state);
  }
}
