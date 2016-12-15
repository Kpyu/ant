import * as Router from 'koa-router';

import { formatRes } from '../../helper/resDataFormat';
import { IContext } from '../index';

export function userApi(router: Router) {
  router.get('/admin/api/userList', async (ctx: IContext, next: any) => {
    let data = require('../../../data/user.json');
    ctx.body = formatRes(data, false);
    return await ctx.toJSON();
  });
  router.post('/admin/api/addUser', async (ctx: IContext, next: any) => {
    ctx.body = formatRes({ msg: '添加成功' }, false);
    return await ctx.toJSON();
  });
  router.post('/admin/api/delUser', async (ctx: IContext, next: any) => {
    ctx.body = formatRes({ msg: '删除成功' }, false);
    return await ctx.toJSON();
  });
}
