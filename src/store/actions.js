import { Message } from 'element-ui';
Message.closeAll();
import {
  getChick,
  getGoods,
  getUserGoods,
  getUserFoods,
  postUnlock,
  postClosingGood,
  postFeeding
} from '../plugins/http/api'

import {
  DEDUCT_MONEY,
  UPDATE_MONEY,
  UPDATE_GOODS_UNLOCK,
  // UPDATE_CHICK,
  SET_TOKEN,
  SET_USERINFO,
  SET_CURR_GOOD,
  SET_CURR_FOOD,
  LOGIN_OUT,
  SET_CHICK,
  GET_GOODS,
  GET_USER_GOODS,
  GET_USER_FOODS,
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
  setChick(context, value) {
    context.commit(SET_CHICK,value);
  },
  loginOut(context) {
    context.commit(LOGIN_OUT);
  },
  setStore(context) {
    context.commit(SET_STORE);
  },
  getStore(context, value) {
    context.commit(GET_STORE, value);
  },
  async reqChick(context) {
    const result = await getChick();
    if (result.code === 1) {
      context.commit(SET_CHICK,result.data[0]);
    }
  },
  async reqGetGoods(context) {
    // 请求商品列表数据
    const result = await getGoods();
    // 把商品列表数据赋值给state
    context.commit(GET_GOODS,{goodsList: result.data});
    if (result.code === 1) {
      // 获取商品成功后再获取当前用户的商品
      const result2 = await getUserGoods();
      context.commit(GET_USER_GOODS,{userGoodsList: result2.data});
    }
  },
  async reqGetUserFood(context) {
    const result = await getUserFoods();
    context.commit(GET_USER_FOODS,{userFoodsList: result.data});
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
  // 设置当前选中食物
  setCurrFood(context, value) {
    context.commit(SET_CURR_FOOD, value);
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
  },
  // 投喂食物
  async reqFeeding(context, value) {
    const resule = await postFeeding(value);
    console.log("投喂请求后返回的数据");
    console.log(resule.data.chick);
    console.log(resule.data.data);
    // 更新投喂后的小鸡信息
    context.commit(SET_CHICK, resule.data.chick);
    Message({
      message: '投喂成功',
      type: 'success'
    });
  },
  // 进食结束(需要更新小鸡等级等信息)
  // endeat (context) {
  //   context.commit('END_EAT');
  // }
}