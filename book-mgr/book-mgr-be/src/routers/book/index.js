// 本页处理书籍逻辑
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');

const BOOK_CONST = {
  IN: 'IN_COUNT',
  OUT: 'IN_COUNT',
};

const Book = mongoose.model('Book');
const InventoryLog = mongoose.model('InventoryLog');

const findBookOne = async (id) => {
  const one = Book.findOne({
    _id: id,
  }).exec();

  return one;
};

const router = new Router({
  prefix: '/book',
});

// 添加书籍的接口
router.post('/add', async (ctx) => {
  const { name, price, author, publishDate, classify, count } = getBody(ctx);

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count,
  });

  const res = await book.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '添加成功',
  };
});

// 获取列表的接口
router.get('/list', async (ctx) => {
  const { keyword = '' } = ctx.query;

  const query = {};

  if (keyword) {
    query.name = keyword;
  }

  const list = await Book.find(query)
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

// 删除接口
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  const delMsg = await Book.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    msg: '删除成功',
    code: 1,
  };
});

// 出入库接口
router.post('/update/count', async (ctx) => {
  const { id, type } = ctx.request.body;

  let { num } = ctx.request.body;

  num = Number(num);

  const book = await findBookOne(id);

  if (!book) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍',
    };

    return;
  }

  // 找到了书
  if (type === BOOK_CONST.IN) {
    // 入库操作
    num = Math.abs(num);
  } else {
    // 出库操作
    num = -Math.abs(num);
  }

  book.count = book.count + num;

  if (book.count < 0) {
    ctx.body = {
      code: 0,
      msg: '剩下的量不足以出库',
    };

    return;
  }

  const res = await book.save();

  //出入库日志保存
  const log = new InventoryLog({
    num: Math.abs(num),
    type,
    bookId: id,
  });

  log.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '操作成功',
  };
});

// 修改操作接口
router.post('/update', async (ctx) => {
  const {
    id,
    ...others //剩余参数 ---> 把ctx.request.body除了id意外的所有属性集合起来放进others
  } = ctx.request.body;

  const one = await findBookOne(id);

  // 没有找到书的情况
  if (!one) {
    ctx.body = {
      msg: '没有找到书籍',
      code: 0,
    };
    return;
  }

  const newQuery = {};
  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

  Object.assign(one, newQuery);

  const res = await one.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '保存成功',
  };
});

router.get('/detail/:id', async (ctx) => {
  const { id } = ctx.params;

  const one = await findBookOne(id);

  // 没有找到书的情况
  if (!one) {
    ctx.body = {
      msg: '没有找到书籍',
      code: 0,
    };
    return;
  }

  ctx.body = {
    msg: '查询成功',
    data: one,
    code: 1,
  };
});

module.exports = router;
