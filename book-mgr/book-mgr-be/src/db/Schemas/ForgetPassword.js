// 重置密码Schema

const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const ForgetPasswordSchema = new mongoose.Schema({
  account: String,

  // 1 待处理
  // 2 已重置
  // 3 以忽略
  status: Number,

  meta: getMeta(),
});
ForgetPasswordSchema.pre('save', preSave);

mongoose.model('ForgetPassword', ForgetPasswordSchema);
