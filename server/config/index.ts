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
import * as Path from 'path';
import * as webpack from 'webpack';
import * as mongoose from 'mongoose';
const port = process.env.PORT || 3000;
const DEBUG = process.env.NODE_ENV === 'development';
function configEnv(name) {
  return require('./' + (process.env.NODE_ENV || 'development') + '/' + name).default;
}
export default {
  name: 'AntCMS', // 项目名
  DEBUG: DEBUG,
  mongoUrl: configEnv('env').mongoUrl,
  env: process.env.NODE_ENV || 'development',
  port: port, // 监听端口
  mongooseConfig:{
    schemas: Path.join(__dirname, '..', 'models'),
  },
  mongodb: {
    username: '',
    password: '',
    host: '127.0.0.1',
    port: 27107,
    database: 'ant'
  },

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

