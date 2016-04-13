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

import Koa from 'koa';
import Path from 'path';
import bunyanLogger from 'koa-bunyan';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import serve from 'koa-static';
// import views from 'koa-views';
import render from 'koa-ejs';
import co from 'co';

import logger from './logger';
import Config from '../config';
import assetsPipeLine from './middleware/assetsPipeLine';
import router from './router';
const app = new Koa();

app.use(convert(bunyanLogger(logger, {
  level: 'info',
  timeLimit: 250
})));

// 路由基本用法
// let router = koaRouter();
// router.get('/', function(ctx, next) {
//   ctx.body = '你好 世界';
// });
// 添加webpack 中间件
if (Config.env === 'development') {
  Config.developmentMiddleWare(app);
}

app
  .use(router.routes())
  .use(router.allowedMethods());

// 添加静态资源服务中间件
app.use(serve(Config.static.directory));

// 添加视图解析器
render(app, Config.view);
app.context.render = co.wrap(app.context.render);
// app.use(views(__dirname, { extension: 'ejs' }));

// 添加assets管道
app.use(assetsPipeLine({
  manifest: Path.join(__dirname, '..', 'manifest.json'),
  prepend: ''
}));
// 添加各种中间件
app.use(bodyParser);

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(Config.port, function() {
  console.log('Start app listening at http://localhost:%s, environment:%s', Config.port, Config.env);
});

