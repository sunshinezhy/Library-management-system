const Koa = require('koa');
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const { logMiddleware } = require('./helpers/log');
const cors = require('@koa/cors');

const app = new Koa();

connect().then(() => {
  // 加载中间件
  app.use(cors());
  app.use(koaBody());

  app.use(logMiddleware);

  registerRoutes(app);

  // listen表示去监听一个端口
  // 开启一个 http 服务
  // 接受HTTP请求并做处理，处理完响应
  app.listen(3000, () => {
    console.log('启动成功');
  });
});
