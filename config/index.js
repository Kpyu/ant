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
import Path from 'path';
import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
const port = process.env.PORT || 3000;
const DEBUG = process.env.NODE_ENV === 'development';

const config = {
  name: 'AntCMS', // 项目名
  DEBUG: DEBUG,
  env: process.env.NODE_ENV || 'development',
  port: port, // 监听端口
  session: { // session 配置
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  },
  view: { // 视图路径配置
    root: Path.resolve(__dirname, '..', 'server', 'views'),
    viewExt: 'html',
    layout: false,
    cache: DEBUG ? false : 'memory',
    debug: DEBUG
  },
  reactConfig: {
    root: Path.resolve(__dirname, '..', 'client', 'src'),
    viewExt: '.jsx'
  },
  static: { // 静态资源目录配置
    directory: Path.resolve(__dirname, '..', 'dist')
  },
  envConfig: function (name) {
    return require('./' + (process.env.NODE_ENV || 'development') + '/' + name);
  },
  /**
   * @param app koa app
   */
  developmentMiddleWare: function (app) {
    let webpackConfig = require('../webpack.config')(config.env);
    let ProgressPlugin = require('webpack/lib/ProgressPlugin');
    let chalk = require('chalk');
    let compiler = webpack(webpackConfig);
    compiler.apply(new ProgressPlugin(function (percentage, msg) {
      var stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write('📦  ' + chalk.magenta(msg));
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(chalk.green('\nwebpack: bundle build is now finished.'));
      }
    }));
    app.use(devMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      status: { colors: true },
      quiet: false
    }));
    app.use(hotMiddleware(compiler));
  },
  /**
   * 错误页配置
   */
  error: {
    view: '',
    custom: {
      401: '',
      402: '',
      403: ''
    }
  }
};
module.exports = config;
