// 这里写出入库日志接口相关的所有前端的接口请求

import axios from "axios";

export const list = () => {
  return axios.get(`http://localhost:3000/character/list`);
};
