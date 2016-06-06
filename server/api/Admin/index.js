import koaRouter from 'koa-router';
import { registerControllers } from './controllers';
const router = koaRouter();
export function initController () {
  router.prefix('/admin');
  registerControllers(router);
  return router;
}
