import { registerControllers } from './controllers';
export function initController (router) {
  console.log('注册路由', router);
  return registerControllers(router);
}
