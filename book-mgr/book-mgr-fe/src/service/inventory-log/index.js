// 这里写出入库日志接口相关的所有前端的接口请求

import axios from "axios";

export const list = (type = "IN_COUNT", id) => {
  return axios.get(`http://localhost:3000/inventory-log/list`, {
    params: {
      type,
      id,
    }
  });
};
