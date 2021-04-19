const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');
// 用户Schema，映射到用户文档具体有哪些数据
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  character: String,

  meta: getMeta(),
});
UserSchema.pre('save', preSave);

mongoose.model('User', UserSchema);
