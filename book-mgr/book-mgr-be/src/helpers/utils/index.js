const getBody = (ctx) => {
  // 获取提交的数据
  return ctx.request.body || {};
};

module.exports = {
  getBody,
};
