//   神兽护体
//   ┏┓       ┏┓
//  ┏┛┻━━━━━━━┛┻┓
//  ┃           ┃
//  ┃     ━     ┃
//  ┃  ┳┛   ┗┳  ┃
//  ┃           ┃
//  ┃```  ┻  ```┃
//  ┃           ┃
//  ┗━┓      ┏━━┛
//    ┃      ┃   Code is far away from bug with the animal protecting.
//    ┃      ┃   神兽护佑,代码无bug.
//    ┃      ┗━━━┓
//    ┃          ┣┓
//    ┃          ┏┛
//    ┗┓┓┏━━┳┓┏━━┛
//     ┃┫┫  ┃┫┫
//     ┗┻┛  ┗┻┛

import * as Router from 'koa-router';
import { IRouterContext } from 'koa-router';

import { api } from './admin';

const router = new Router();
const DEBUG: boolean = process.env.NODE_ENV === 'development';

export interface IContext extends IRouterContext {
    session: any;
    render(view: string): void;
    model(modelName: string): any;
}

router.get('/', async (ctx: IContext, next: any) => {
    console.log('进入博客首页');
    await ctx.render('blog/index');
});

router.get('/admin/*/**', async (ctx: IContext, next: any) => {
    // ctx.body = 'test!';
    await next();
    // if (!ctx.session.user) {
    //     ctx.body = {
    //         suceess: false,
    //         msg: '登录失效',
    //         code: '10000',
    //     };
    //     await ctx.toJSON();
    // } else {
    //     await next();
    // }
});
router.get('/admin', async (ctx: IContext, next: any) => {
    // if (!ctx.session.user) {
    //     ctx.redirect('/login');
    //     return;
    // }
    if (DEBUG) {
        await ctx.render('index-w');
    } else {
        await ctx.render('index-aot');
    }
});
// 跳转登录页面
router.get('/login', async (ctx: IContext, next: any) => {
    await ctx.render('login');
});


// 执行登录
router.post('/login', async (ctx: IContext, next: any) => {
    console.log(ctx.req.pipe);
    ctx.session.user = 'admin';
    await ctx.redirect('/admin');
});
router.get('/logout', async (ctx: IContext, next: any) => {
    delete ctx.session.user;
    await ctx.redirect('/login');
});

// 跳转注册页面
router.get('/resgistry', async (ctx: IContext, next: any) => {
    await ctx.render('login');
});


// 执行注册
router.post('/resgistry', async (ctx: IContext, next: any) => {
    let User = ctx.model('user');
    let user = await User.findOne({
        username: 'admin',
    });
    console.log('查找的用户', user);
    if (user) {
        return ctx.body = 'admin 已经初始化啦！';
    } else {
        let userObj = new User({
            username: 'admin',
            email: 'ahukpyu@gmail.com',
            password: 'admin1234',
        });
        console.log('schema-----', userObj);
        let result = await userObj.save((err: any) => {
            console.log(err);
        });
        console.log(result);
        return ctx.body = '用户初始化成功';
    }

});

api(router);

export default router;
