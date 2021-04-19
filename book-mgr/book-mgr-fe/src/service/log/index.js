// 访问日志的接口的逻辑
import axios from "axios";

export const list = () => {
  return axios.get("http://localhost:3000/log/list");
};

export const remove = id => {
  return axios.post("http://localhost:3000/log/delete", {
    id
  });
};
