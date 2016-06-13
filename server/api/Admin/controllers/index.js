
import path from 'path';
import { readdirSync } from 'fs';
import * as login from './LoginController';
import * as main from './mainController';


export function registerControllers(router) {
  login.doLogin(router);
  Object.keys(main).forEach(function (key) {
    main[key](router);
  });
}
