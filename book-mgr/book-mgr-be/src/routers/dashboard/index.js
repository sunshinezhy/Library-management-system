const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/dashboard',
});

router.get('/bash-info', async (ctx) => {
  const bookTotal = await Book.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.find({ show: true }).countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      total: {
        book: bookTotal,
        user: userTotal,
        log: logTotal,
      },
    },
  };
});

module.exports = router;
