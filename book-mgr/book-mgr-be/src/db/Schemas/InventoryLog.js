const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');
// 库存（出入库）Schema，映射到用户文档具体有哪些数据
const InventoryLogSchema = new mongoose.Schema({
  type: String,
  num: Number,
  bookId: String,

  meta: getMeta(),
});

InventoryLogSchema.pre('save', preSave);

mongoose.model('InventoryLog', InventoryLogSchema);
