import { Message } from 'element-ui';
Message.closeAll();
import {
  getGoods,
  getUserGoods,
  postUnlock,
  postClosingGood
} from '../plugins/http/api'

import {
  DEDUCT_MONEY,
  UPDATE_MONEY,
  UPDATE_GOODS_UNLOCK,
  SET_TOKEN,
  SET_USERINFO,
  SET_CURR_GOOD,
  LOGIN_OUT,
  GET_GOODS,
  GET_USER_GOODS,
  UPDATE_USER_GOODS,
  SET_STORE,
  GET_STORE
} from './mutation-types'

export default {
  deductMoney(context, value) {
    context.commit(DEDUCT_MONEY,value);
  },
  setToken(context, value) {
    context.commit(SET_TOKEN, value);
  },
  setUserInfo(context, value) {
    context.commit(SET_USERINFO,value);
  },
  loginOut(context) {
    context.commit(LOGIN_OUT);
  },
  setStore(context) {
    context.commit(SET_STORE);
  },
  getStore(context) {
    context.commit(GET_STORE);
  },
  async reqGetGoods(context, value) {
    // 请求商品列表数据
    const result = await getGoods();
    // 把商品列表数据赋值给state
    context.commit(GET_GOODS,{goodsList: result.data});
    if (result.code === 1) {
      // 获取商品成功后再获取当前用户的商品
      const result2 = await getUserGoods(value);
      context.commit(GET_USER_GOODS,{userGoodsList: result2.data});
    }
  },
  async reqUnlock(context, value) {
    // 请求解锁商品接口
    const result = await postUnlock(value);
    if (result.code === 0) {
      // 更新金币
      context.commit(UPDATE_MONEY, value.money);
      // 更新商品解锁状态
      context.commit(UPDATE_GOODS_UNLOCK, value.name);
      Message({
        message: '解锁成功',
        type: 'success'
      });
    }
  },
  // 设置当前选择商品
  setCurrGood(context, value) {
    context.commit(SET_CURR_GOOD, value);
  },
  // 购买商品
  async reqClosingGood(context, value) {
    const result = await postClosingGood(value);
    // 更新金币
    context.commit(UPDATE_MONEY, value.money);
    // 更新vuex用户商品信息
    context.commit(UPDATE_USER_GOODS,result.data);
    Message({
      message: '购买成功',
      type: 'success'
    });
  }
}