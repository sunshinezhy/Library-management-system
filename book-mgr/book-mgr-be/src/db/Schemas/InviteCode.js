const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');
// 邀请码Schema，映射到用户文档具体有哪些数据
const InviteCodeSchema = new mongoose.Schema({
  // 邀请码
  code: String,
  // 用来注册那个账号
  user: String,

  meta: getMeta(),
});
InviteCodeSchema.pre('save', preSave);

// 注册成为一个模型
mongoose.model('InviteCode', InviteCodeSchema);
