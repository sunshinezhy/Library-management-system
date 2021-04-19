const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const LogResponseSchema = new mongoose.Schema({
  logId: String,
  data: String,

  meta: getMeta(),
});
LogResponseSchema.pre('save', preSave);

mongoose.model('LogResponse', LogResponseSchema);
