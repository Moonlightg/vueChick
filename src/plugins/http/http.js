import axios from 'axios';
const baseURL = "http://127.0.0.1:3000";  // 定义根域名
const baseURL2 = "https://webstatic.mihoyo.com";  // 原神api

// 封装 post 请求
export function post(action, params){
  return new Promise((resolve, reject) => {
    // url 判断是测试环境 就要拿 测试环境的域名， 正式环境的就要用 正式域名
    let url = baseURL + action;
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  });
}

// 封装 get 请求
export function get(action, params){
  return new Promise((resolve, reject) => {
    axios.get(baseURL + action, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  });
}

// 封装 get 请求(公开)
export function Allget(action, params){
  return new Promise((resolve, reject) => {
    axios.get(baseURL2 + action, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  });
}

export default {
  postData(action, params){
    return post(action, params)
  },
  getData(action, params){
    return get(action, params)
  },
  getAllData(action, params){
    return Allget(action, params)
  }
}
