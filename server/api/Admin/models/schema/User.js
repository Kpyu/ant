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
/**
 * 用户模型
 * @param {String} realName 昵称
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} createTime 创建日期
 * */
import Mongoose, {
  Schema
} from 'mongoose';
import Util from '../../../helper';
const UserSchema = new Schema({
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
