import Vue from 'vue'
import Vuex from 'vuex'
// 引入 axios
import axios from 'axios'
import storage from '../plugins/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  // 定义状态
  state: {
    // 存储token
    // token: storage.get('token') ? storage.get('token') : '',
    token:""
  },
  mutations: {
    // 修改token，并将token存入localStorage
    set_token(state,token) {
      state.token = token;
      storage.set('token', token);
      console.log('store、localstorage保存token成功！');
    }
  },
  actions: {
  },
  modules: {
  }
})
