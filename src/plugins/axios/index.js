"use strict";

import Vue from 'vue';
import axios from "axios";
import storage from '../../plugins/storage'

axios.interceptors.request.use(
  config => {
    if (storage.get("token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = storage.get("token");
      console.log("设置token请求头");
      console.log(storage.get("token"));
    }
    return config;
  },
  err => {
    console.log("在request拦截器显示错误：", err.response)
    return Promise.reject(err);
  }
);

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL="http://127.0.0.1:3000"
Vue.prototype.$ajax = axios
