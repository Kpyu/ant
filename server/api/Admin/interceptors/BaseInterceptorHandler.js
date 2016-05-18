export default class {
  /*
   *router调用之前的处理逻辑
   */
  static before(ctx) { }
  /**
   * 拦截器的综合处理，若要修改before/after的调用时机可重写此方法
   */

  static handle(app) {
    app.use((ctx, next) => {
      this.before(ctx);
      return next().then(
        this.after(ctx)
      );
    });
  }

  /*
   *router调用之后的处理逻辑
   */
  static after(ctx) { }
}
