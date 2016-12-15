import * as Router from 'koa-router';

import { formatRes } from '../../helper/resDataFormat';
import { IContext } from '../index';
import { userApi } from './user';

export function api(router: Router) {
  router.get('/admin/api/getMenus', async (ctx: IContext, next: any) => {
    let data = require('../../../data/menu.json');
    ctx.body = formatRes(data, false);
    return await ctx.toJSON();
  });
  userApi(router);
}
