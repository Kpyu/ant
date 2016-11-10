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
const router = new Router();
const DEBUG: boolean = process.env.NODE_ENV === 'development';

// 跳转管理页首页
router.get('/admin', async (ctx: any, next: any) => {
    // ctx.body = 'test!';
    if (DEBUG) {
        await ctx.render('index-w');
    } else {
        await ctx.render('index-aot');
    }
});


// 跳转登录页面
router.get('/login', async (ctx: any, next: any) => {
    await ctx.render('login');
});


// 执行登录
router.post('/login', async (ctx: any, next: any) => {
    await ctx.render('login');
});

// 跳转注册页面
router.get('/resgistry', async (ctx: any, next: any) => {
    await ctx.render('login');
});


// 执行注册
router.post('/resgistry', async (ctx: any, next: any) => {
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
export default router;
