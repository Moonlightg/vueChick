import storage from '../plugins/storage'
import {
  DEDUCT_MONEY,
  UPDATE_MONEY,
  UPDATE_GOODS_UNLOCK,
  SET_USERINFO,
  LOGIN_OUT,
  GET_GOODS,
  GET_USER_GOODS,
  SET_STORE,
  GET_STORE
} from './mutation-types'

export default {
  [DEDUCT_MONEY](state,money) {
    state.userinfo.money = state.userinfo.money - money;
  },
  [UPDATE_MONEY](state,newMoney) {
    state.userinfo.money = newMoney;
  },
  [UPDATE_GOODS_UNLOCK](state, name) {
    state.goodsList.forEach(itemData => {
      if(itemData.name === name) {
        itemData.unlock = 1;
      }
    });
  },
  [SET_USERINFO](state, user) {
    state.userinfo = user.data;
    state.token = user.token;
    state.isLogin = true;
    storage.set('userinfo',state.userinfo);
    storage.set('token', state.token);
    storage.set('isLogin', true);
    console.log('store、localstorage中保存用户信息成功！');
  },
  [LOGIN_OUT](state) {
    storage.removeAll(); // 清除缓存
    state.token = '',
    state.userinfo = {};
    state.isLogin = false;
  },
  [GET_GOODS](state,{goodsList}) {
    state.goodsList = goodsList;
  },
  [GET_USER_GOODS](state,{userGoodsList}) {
    state.userGoodsList = userGoodsList;
    // 遍历比较更新前端界面显示
    state.goodsList.forEach(itemData => {
      state.userGoodsList.forEach(itemUser => {
        if(itemData.name === itemUser.name) {
          itemData.num = itemUser.num;
          itemData.unlock = itemUser.unlock;
        }
      })
    })
  },
  // 在缓存中存储state
  [SET_STORE](state) {
    storage.set('store',state);
  },
  // 读取缓存中的state
  [GET_STORE]() {
    storage.get('store');
  }
}