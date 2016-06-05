
import path from 'path';
import { readdirSync } from 'fs';
import * as login from './LoginController';

export function registerControllers(router) {
  login.doLogin(router);
}
