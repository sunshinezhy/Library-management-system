// require这个文件就会去执行
require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Book');
require('./Schemas/InventoryLog');
require('./Schemas/Character');
require('./Schemas/Log');
require('./Schemas/LogResponse');
require('./Schemas/ForgetPassword');

// 引进mongoose
const mongoose = require('mongoose');

// 1. 给哪个数据库的(给book-mgr)
// 那个集合
// 添加什么格式的文档

// Schema 映射了MongoDB下的一个集合，并且它的内容就是集合下文档的构成
// Modal 可以理解成是根据schema生成的一套方法，这套方法用来操作mongoDB集合和集合下的文档
const connect = () => {
  return new Promise((resolve) => {
    // 去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    // 当数据库被打开的时候 做一些事情
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');

      resolve();
    });
  });
};

module.exports = {
  connect,
};
