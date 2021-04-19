import axios from "axios";

export const baseInfo = () => {
  return axios.get("http://localhost:3000/dashboard/bash-info");
};
