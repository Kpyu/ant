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

router.get('/', async (ctx:any, next:any) => {
    // ctx.body = 'test!';
    await ctx.render('index');
})
router.get('/resgistry', async (ctx: any, next: any) => {
    let User = ctx.model('user');
    let user = await User.findOne({
        username: 'admin'
    });
    console.log('查找的用户', user);
    if (user) {
        return ctx.body = 'admin 已经初始化啦！';
    } else {
        var userObj = new User({
            username: 'admin',
            email: 'ahukpyu@gmail.com',
            password: 'admin1234'
        });
        console.log('schema-----', userObj);
        let result = await userObj.save((err:any) => {
            console.log(err);
        });
        console.log(result);
        return ctx.body = '用户初始化成功';
    }

})
export default router;