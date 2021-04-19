// 本页处理auth（认证相关的内容）
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const jwt = require('jsonwebtoken');
const config = require('../../project.config');

// 拿到注册的模型
const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
  prefix: '/auth',
});

// 注册相关 接受post提交的数据
router.post('/register', async (ctx) => {
  // 获取数据
  const { account, password, inviteCode } = getBody(ctx);

  // 做表单校验
  if (account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    };
    return;
  }

  // 找有没有邀请码
  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec();

  // 去判断有没有邀请码
  // 如果没找到邀请码
  if (!findCode || findCode.user) {
    ctx.body = {
      code: 0,
      msg: '邀请码不正确',
      data: null,
    };

    return;
  }

  //去找account为传递上来的“account”的用户
  const findUser = await User.findOne({
    account,
  }).exec();

  //    判断有没有用户
  if (findUser) {
    // 如果有表示已经存在
    ctx.body = {
      code: 0,
      msg: '该用户已存在',
      data: null,
    };

    return;
  }

  //创建一个用户
  const user = new User({
    account,
    password,
  });

  // 把创建的用户同步到mongodb
  const res = await user.save();

  findCode.user = res._id;
  findCode.modifiedPaths.updatedAt = new Date().getTime();

  await findCode.save();

  // 响应成功
  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res,
  };
});

// 登录相关
router.post('/login', async (ctx) => {
  const { account, password } = getBody(ctx);

  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    };
    return;
  }

  const one = await User.findOne({
    account,
  }).exec();

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null,
    };

    return;
  }

  const user = {
    account: one.account,
    character: one.character,
    _id: one._id,
  };

  if (one.password === password) {
    ctx.body = {
      code: 1,
      msg: '登录成功',
      data: {
        user,
        token: jwt.sign(user, config.JWT_SECRET),
      },
    };
    // 控制台输出token
    // console.log(ctx.body.data.token);

    return;
  }

  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null,
  };
});

module.exports = router;
