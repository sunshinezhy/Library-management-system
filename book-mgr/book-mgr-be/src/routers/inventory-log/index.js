// 本页处理出入库逻辑
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// const { getBody } = require('../../helpers/utils/index');

const InventoryLog = mongoose.model('InventoryLog');

const router = new Router({
  prefix: '/inventory-log',
});

router.get('/list', async (ctx) => {
  const { type, id } = ctx.query;

  // 取到数据
  const list = await InventoryLog.find({ type, bookId: id })
    .sort({
      _id: -1,
    })
    .exec();

  ctx.body = {
    data: list,
    code: 1,
    msg: '获取列表成功',
  };
});

module.exports = router;
