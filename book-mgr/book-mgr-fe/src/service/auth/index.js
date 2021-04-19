// 这里写认证相关的所有前端的接口请求

import axios from 'axios';

export const register = (account, password, inviteCode) => {
    return axios.post('http://localhost:3000/auth/register',{
        account,
        password,
        inviteCode,
    });
};

export const login = (account,password) => {
    return axios.post('http://localhost:3000/auth/login',{
        account,
        password,
    });
};