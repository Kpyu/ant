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
///<reference path="../dts/index.d.ts" />
import * as Koa from 'koa';
import * as Path from 'path';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as views from 'koa-views';
import * as co from 'co';
import * as favicon from 'koa-favicon';
import mongoose = require('mongoose');
import mongooseMiddleware from './middleware/koa-mongoose';
import pipeLine from './middleware/assetsPipeLine';
import config from './config';

global['__DB__'] =  mongoose.connect(config.mongoUrl).connection;

// import renderApp from './serverRender';
import Config from './config';
import router from './router';
const app = new Koa();
const mongoDB = process.env.MONGODB_URI || Config.mongoUrl;


// app.use(convert(bunyanLogger(logger, {
//   level: 'info',
//   timeLimit: 250
// })));



// mongoose.connect(mongoDB);
app.use(mongooseMiddleware);
// app.use(pipeLine());
app.use(favicon(Path.join(__dirname, '..', '/client/favicon.ico')));

// 添加webpack 中间件
// if (Config.env ===  'development') {
//   Config.developmentMiddleWare(app);
// }

// 添加ejs视图解析器
app.use(views(Path.resolve(__dirname, '../', 'views'), {
  map: {
    html:'ejs'
  },
}))

// 添加react渲染器
// renderReact(app, Config.reactConfig);
// app.context.react = co.wrap(app.context.react);


// 添加静态资源服务中间件
app.use(serve(Config.static.directory));


// 添加assets管道
app.use(pipeLine({
  manifest: Path.join(__dirname, '../', 'manifest.json'),
  prepend: ''
}));

// 添加各种中间件
app.use(bodyParser());

// 注册路由
app.use(router.routes());
// app.use(router.allowedMethods());
app.listen(Config.port, function () {
  console.log('Start app listening at http://localhost:%s, environment:%s', Config.port, Config.env);
});

