"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from 'qs';
import storage from '../../plugins/storage'

var baseURL = 'http://127.0.0.1:3000';

axios.interceptors.request.use(
  config => {
    if (storage.get("token")) {
      const uid = storage.get('userinfo');
      const userId = uid._id;
      const appId = storage.get('token');
      //判断请求的类型：如果是post请求就把默认参数拼到data里面；如果是get请求就拼到params里面
      if(config.method==='post'){
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = storage.get("token");
        config.data=qs.stringify({
          userId:userId,
          appId:appId,
          ...config.data
        })
      }else if(config.method==='get'){
        if(config.name==='ysGacha') {
          config.params={};
          baseURL = 'https://webstatic.mihoyo.com';
        } else {
          // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = storage.get("token");
          config.params={
            userId:userId,
            appId:appId,
            ...config.params
          }
        }
      }

      // if(config.method==='get' && config.name==='ysGacha') {
      //   config.params={};
      //   baseURL = 'https://webstatic.mihoyo.com';
      // } else if (config.method==='get' && config.name !=='ysGacha') {
      //
      // }
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
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL= baseURL;
Vue.prototype.$ajax = axios
