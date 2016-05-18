import registerControllers from './controllers';
export function initController (router) {
  return registerControllers(router);
}
