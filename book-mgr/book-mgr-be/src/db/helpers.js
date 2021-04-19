// 通用的语言信息  --创建的时间和修改的时间
const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: new Date().getTime(),
    },
    updatedAt: {
      type: Number,
      default: new Date().getTime(),
    },
  };
};

const preSave = function (next) {
  if (this.isNew) {
    const ts = Date.now();

    this['meta'].createdAt = ts;
    this['meta'].updatedAt = ts;
  } else {
    this['meta'].updatedAt = Date.now();
  }
  next();
};

module.exports = {
  getMeta,
  preSave,
};
