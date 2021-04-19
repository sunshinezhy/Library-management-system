// 本页处理邀请码逻辑  (通过uuid生成邀请码)
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// const { getBody } = require('../../helpers/utils/index');

const InviteCode = mongoose.model('InviteCode');

const router = new Router({
  prefix: '/invite',
});

router.post('/add', async (ctx) => {
  const { count = 1 } = ctx.request.body;

  const arr = [];

  for (let i = 0; i < count; i++) {
    arr.push({
      code: uuidv4(),
      user: '',
    });
  }
  const res = await InviteCode.insertMany(arr);

  ctx.body = {
    code: 1,
    data: res,
    msg: '创建成功',
  };
});

router.get('/list', async (ctx) => {
  const list = await InviteCode.find()
    .sort({
      _id: -1,
    })
    .exec();

  ctx.body = {
    data: {
      list,
    },
    msg: '获取列表成功',
    code: 1,
  };
});

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  const res = await InviteCode.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: res,
    msg: '删除成功',
    code: 1,
  };
});

module.exports = router;
