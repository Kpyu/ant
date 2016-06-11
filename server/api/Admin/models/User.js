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
import mongoose, { Schema } from 'mongoose';
/**
 * 用户模型
 * @param {String} realName 昵称
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} createTime 创建日期
 * */
const userSchema = new Schema({
  id: {
    type: String,
    index: true,
    required: true,
    trim: true
  },
  realName: {
    type: String,
    index: true,
    required: true,
    trim: true
  },
  account: {
    type: String,
    index: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    index: true,
    required: false,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createTime: Date,
  isAdmin: {
    type: String,
    default: 0
  }
});
userSchema.statics = {
  queryOne: userId => { },
  /**
   * 检测登录
   */
  checkLogin: (name, password, callback) => {
    var query = { name: name, password: password };
    // return this.userModel.user.count(query, function (err, doc) {
    //   console.log('查询结果', doc);
    //   console.log('查询错误', err);
    //   if (doc === 1) {
    //     callback(true);
    //   } else {
    //     callback(false);
    //   }
    // });
  }
};

export default mongoose.model('User', userSchema);
