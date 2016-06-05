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
import { UserSchema } from './schema/User.js';
import mongoose from 'mongoose';
export default class User {
  constructor(param) {
    this.userModel = mongoose.model('User', UserSchema);
  }
  /**
   * 查询用户列表
   */
  query(pageInfo, queryInfo) {

  }
  /**
   * 查询单个用户
   */
  queryOne(userId) {
    return this.userModel.findOne(userId || 1);
  }

  checkLogin(name, password, callback) {
    var query = { name: name, password: password };
    return this.userModel.user.count(query, function (err, doc) {
      if (doc === 1) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
}
