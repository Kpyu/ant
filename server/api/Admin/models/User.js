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
const UserModel = mongoose.model('User', UserSchema);
export default class User {
  /**
   * 查询用户列表
   */
  query(pageInfo, queryInfo) {

  }
  /**
   * 查询单个用户
   */
  queryOne(userId) {
    return this.UserModel.findOne(userId || 1);
  }

  checkLogin(name, password, callback) {
    var query = { name: name, password: password };
    console.log('用户model', UserModel.find({ }));
    return this.userModel.user.count(query, function (err, doc) {
      console.log('查询结果', doc);
      console.log('查询错误', err);
      if (doc === 1) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
}
