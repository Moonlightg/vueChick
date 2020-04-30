import Vue from 'vue'
import Vuex from 'vuex'

import storage from '../plugins/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  // 定义状态
  state: {
    // 存储token
    // token: storage.get('token') ? storage.get('token') : '',
    token:'',       // token
    username: '',   // 用户名
    isLogin: false  // 登录状态
  },
  // getters 只会依赖 state 中的成员去更新
  getters: {
    token: (state) => state.token,
    username: (state) => state.username,
    isLogin :(state) => state.isLogin
  },
  mutations: {
    // 修改token，并将token存入localStorage
    set_token(state,token) {
      state.token = token;
      storage.set('token', token);
      console.log('store、localstorage保存token成功！');
    },
    set_userName(state, username) {
      state.username = username;
      storage.set('username',username);
      console.log('store、localstorage保存username成功！');
    },
    isLogin(state,status){
      state.isLogin = status;
      storage.set('isLogin', status);
      console.log('store、localstorage保存登录状态成功！');
    },
    loginOut(state) {
      storage.removeAll(); // 清除缓存
      state.username = '';
      state.isLogin = false;
    },
    // 在缓存中存储state
    set_store(state) {
      storage.set('store',state);
    },
    // 读取缓存中的state
    get_store() {
      storage.get('store');
    }
  },
  actions: {
  },
  modules: {
  }
})
