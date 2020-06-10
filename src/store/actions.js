import { Message } from 'element-ui';
Message.closeAll();
import {
  getChick,
  postChick,
  getGoods,
  getUserGoods,
  getUserFoods,
  getUserSkins,
  infoUserSkins,
  postBdySkin,
  postUseSkin,
  postUnlock,
  postClosingGood,
  postFeeding,
  postTasks,
  postReceiveTask,
  addTaskCount,
  postEgg,
  postEggNum,
  addLog,
  getLog
} from '../plugins/http/api'

import {
  SET_LOGIN,
  SET_LOG,
  DEDUCT_MONEY,
  UPDATE_MONEY,
  UPDATE_GEM,
  UPDATE_GOODS_UNLOCK,
  // UPDATE_CHICK,
  SET_TOKEN,
  SET_USERINFO,
  SET_CURR_SKIN,
  SET_CURR_GOOD,
  SET_CURR_FOOD,
  LOGIN_OUT,
  SET_CHICK,
  SET_CHICK_SKIN,
  SET_CHICK_FEEDING_FOOD,
  GET_GOODS,
  GET_USER_GOODS,
  GET_USER_FOODS,
  GET_USER_SKINS,
  UPDATE_USER_GOODS,
  UPDATE_USER_FOODS,
  UPDATE_USER_SKINS,
  INFO_TASKS,
  UPDATE_TASKS,
  SET_STORE,
  GET_STORE
} from './mutation-types'

export default {
  setLogin(context) {
    context.commit(SET_LOGIN);
  },
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
  setChickSkin(context, value) {
    context.commit(SET_CHICK_SKIN,value);
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
  async getLog(context) {
    const result = await getLog();
    if (result.code === 0) {
      context.commit(SET_LOG,result.data);
    }
  },
  async addLog(context, value) {
    const result = await addLog(value);
    console.log("测试日志动态");
    console.log(result);
    if (result.code === 0) {
      context.commit(SET_LOG,result.data);
    }
  },
  async setTasks(context) {
    const result = await postTasks();
    console.log(result);
    if (result.code === 0) {
      context.commit(INFO_TASKS,result.data);
    }
  },
  async receiveTask(context, value) {
    var obj = {
      taskId: value.taskId
    }
    const result = await postReceiveTask(obj);
    console.log(result);
    if (result.code === 0) {
      context.commit(UPDATE_TASKS,result.data.data);
      context.commit(UPDATE_MONEY,result.data.user.money);
      context.commit(UPDATE_GEM,result.data.user.gem);
    }
  },
  async reqChick(context) {
    const result = await getChick();
    if (result.code === 1) {
      context.commit(SET_CHICK,result.data[0]);
    }
  },
  async reqGetSkins(context) {
    const result = await getUserSkins();
    console.log("测试获取用户皮肤数据");
    console.log(result.data);
    if (result.data == null){
      // 如果没有数据,则初始化数据
      const result2 = await infoUserSkins();
      console.log("初始化用户皮肤数据");
      console.log(result2.data);
      context.commit(GET_USER_SKINS,result2.data);
      return false;
    }
    context.commit(GET_USER_SKINS,result.data);
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
  // 设置当前选择皮肤
  setCurrSkin(context, value) {
    context.commit(SET_CURR_SKIN, value);
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
    context.commit(SET_CHICK_FEEDING_FOOD, value);
    const result = await postFeeding(value);
    console.log("投喂请求后返回的数据");
    console.log(result);
    console.log(result.data.chick);
    console.log(result.data.data);
    // 更新投喂后的小鸡信息
    if (result.code == 1) {
      context.commit(SET_CHICK, result.data.chick);
      Message({
        message: '投喂成功',
        type: 'success'
      });
      var obj = {
        type: 1,
        count: 1
      }
      const result2 = await addTaskCount(obj);
      console.log("测试下更新任务的次数");
      console.log(result2);
      context.commit(UPDATE_TASKS,result2.data.data);
    }
    
  },
  // 进食结束(请求更新数据库)
  async reqUpdateChick(context, value) {
    console.log("需要更新的小鸡数据");
    console.log(value);
    const result = await postChick(value);
    console.log("更新后的小鸡数据");
    console.log(result);
    console.log(result.data);
    context.commit(SET_CHICK,result.data);
  },
  // 收取鸡蛋
  async harvestegg(context, value) {
    const result = await postEgg(value);
    console.log("测试收获鸡蛋后的返回数据");
    console.log(result);
    if ( result.code == 0 ) {
      context.commit(UPDATE_USER_FOODS,result.data);
      const result2 = await postEggNum(value);
      if ( result2.code == 0 ) {
        context.commit(SET_CHICK,result2.data);
      }
    } 
  },
  // 购买皮肤
  async reqBuySkin(context, value) {
    const result = await postBdySkin(value);
    if (result.code == 0) {
      // 扣除宝石
      let obj = {
        type: 1,
        price: value.price
      }
      context.commit(DEDUCT_MONEY,obj);
      // 更新数据
      context.commit(UPDATE_USER_SKINS,result.data);
    }
  },
  // 使用皮肤
  async reqUseSkin(context, value) {
    const result = await postUseSkin(value);
    console.log(result);
    if (result.code == 0) {
      context.commit(GET_USER_SKINS,result.data.userskin);
      context.commit(SET_CHICK,result.data.chick);
      Message({
        message: '皮肤使用成功',
        type: 'success'
      });
    }
  }
}