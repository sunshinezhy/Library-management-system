// 重置密码的接口的逻辑
import axios from "axios";

export const list = () => {
  return axios.get("http://localhost:3000/forget-password/list");
};

export const add = account => {
  return axios.post("http://localhost:3000/forget-password/add", {
    account
  });
};

export const updateStatus = (id, status) => {
  return axios.post("http://localhost:3000/forget-password/update/status", {
    id,
    status
  });
};
