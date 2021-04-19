import axios from "axios";
import { getToken } from "@/helpers/token";
export const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  };
};

export const post = (url, data = {}) => {
  return axios.post(url, data, {
    headers: getHeaders()
  });
};

export const del = url => {
  return axios.delete(url, {
    headers: getHeaders()
  });
};

export const get = (url, data = {}) => {
  return axios.get(url, {
    params: data,
    headers: getHeaders()
  });
};
