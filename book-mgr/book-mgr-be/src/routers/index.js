const auth = require('./auth/index');
const InviteCode = require('./invite-code');
const book = require('./book');
const inventoryLog = require('./inventory-log/index');
const user = require('./user');
const character = require('./character');
const log = require('./log');
const forgetPassword = require('./forget-password');
const profile = require('./profile');
const dashboard = require('./dashboard');

// 注册路由
module.exports = (app) => {
  app.use(auth.routes());
  app.use(InviteCode.routes());
  app.use(book.routes());
  app.use(inventoryLog.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(forgetPassword.routes());
  app.use(profile.routes());
  app.use(dashboard.routes());
};
