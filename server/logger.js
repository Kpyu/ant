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

import bunyan from 'bunyan';
import pkg from '../package.json';
const bunyanOptions = {
  name: pkg.name,
  streams: [
    {
      level: 'info',
      stream: process.stdout
    }, {
      level: 'debug',
      type: 'rotating-file',
      path: 'build/logger.log',
      period: '1d',
      count: 3
    }
  ],
  serializers: bunyan.stdSerializers,
  src: true
};

let logger = bunyan.createLogger(bunyanOptions);
module.exports = logger;
