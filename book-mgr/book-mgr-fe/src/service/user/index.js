// 这里写用户列表接口相关的所有前端的接口请求

import axios from "axios";

export const list = (keyword = "") => {
  return axios.get(`http://localhost:3000/user/list`, {
    params: {
      keyword
    }
  });
};

// 删除对应的接口
export const remove = id => {
  return axios.delete(`http://localhost:3000/user/${id}`);
};

// 增加用户接口
export const add = (account, password, character) => {
  return axios.post("http://localhost:3000/user/add", {
    account,
    password,
    character
  });
};

// 重置密码接口
export const resetPassword = id => {
  return axios.post("http://localhost:3000/user/reset/password", {
    id
  });
};

export const info = () => {
  return axios.get("http://localhost:3000/user/info");
};
