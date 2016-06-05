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
import serveCache from 'koa-static-cache';
import views from 'koa-views';
import render from 'koa-ejs';
import co from 'co';
import Boom from 'boom';
import favicon from 'koa-favicon';
import mongoose from 'mongoose';
import renderApp from './serverRender';
import logger from './logger';
import Config from '../config';
import assetsPipeLine from './middleware/assetsPipeLine';
import router from './router';
const app = new Koa();
const mongoDB = process.env.MONGODB_URI || Config.mongoUrl;
// app.use(convert(bunyanLogger(logger, {
//   level: 'info',
//   timeLimit: 250
// })));
mongoose.connect(mongoDB);

app.use(favicon(Path.join(__dirname, '..', '/client/favicon.ico')));

// 添加webpack 中间件
// if (Config.env ===  'development') {
//   Config.developmentMiddleWare(app);
// }

// 添加ejs视图解析器
render(app, Config.view);
app.context.render = co.wrap(app.context.render);

// 添加react渲染器
// renderReact(app, Config.reactConfig);
// app.context.react = co.wrap(app.context.react);


// 添加静态资源服务中间件
app.use(serve(Config.static.directory));


app.use(renderApp());
// 添加assets管道
// app.use(assetsPipeLine({
//   manifest: Path.join(__dirname, '..', 'manifest.json'),
//   prepend: ''
// }));

// 添加各种中间件
app.use(bodyParser());

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(Config.port, function () {
  console.log('Start app listening at http://localhost:%s, environment:%s', Config.port, Config.env);
});

