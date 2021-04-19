const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/profile',
});

router.post('/update/password', async (ctx) => {
  const { password, oldPassword } = ctx.request.body;

  const payload = await verify(getToken(ctx));
  const { _id } = payload;

  const user = await User.findOne({
    _id,
  }).exec();

  if (!user) {
    ctx.body = {
      msg: '用户不存在',
      code: 0,
    };
    return;
  }
  if (user.password !== oldPassword) {
    ctx.body = {
      msg: '密码校验失败',
      code: 0,
    };
    return;
  }

  user.password = password;

  await user.save();

  ctx.body = {
    msg: '修改成功',
    code: 1,
  };
});

module.exports = router;
