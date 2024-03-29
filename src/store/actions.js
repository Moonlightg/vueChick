import { Message } from 'element-ui';
Message.closeAll();
import {
  getUserInfo,
  getChick,
  postChick,
  postUser,
  getGoods,
  getUserGoods,
  getUserFoods,
  getUserSkins,
  getUserStudy,
  infoUserSkins,
  postBdySkin,
  postUseSkin,
  postUnlock,
  postFirstClosingGood,
  postClosingGood,
  postSellFood,
  postFeeding,
  postTasks,
  postReceiveTask,
  addTaskCount,
  postEgg,
  postEggNum,
  addLog,
  getLog,
  getFriends,
  setCurrUser,
  postProfile,
  deductionFood,
  setName,
  postLuckDraw,
  addBarrage,
  getGacha,
  getUserGacha,
  setUserGacha,
} from '../plugins/http/api'
import ajax from '../plugins/http/http'

import {
  SET_LOGIN,
  SET_LOG,
  DEDUCT_MONEY,
  UPDATE_MONEY,
  ADD_MONEY,
  UPDATE_GEM,
  UPDATE_GOODS_UNLOCK,
  // UPDATE_CHICK,
  SET_TOKEN,
  SET_USER,
  SET_USERINFO,
  SET_CURR_SKIN,
  SET_CURR_GOOD,
  SET_CURR_FOOD,
  SET_CURR_USER,
  SET_CURR_USER_CHICK,
  LOGIN_OUT,
  SET_CHICK,
  SET_CHICK_SKIN,
  SET_CHICK_FEEDING_FOOD,
  GET_GOODS,
  GET_USER_GOODS,
  GET_USER_FOODS,
  GET_USER_SKINS,
  GET_USER_STUDY,
  UPDATE_USER_GOODS,
  UPDATE_USER_FOODS,
  UPDATE_USER_SKINS,
  ADD_USER_FOOD,
  INFO_TASKS,
  UPDATE_TASKS,
  GET_FRIENDS,
  SET_STORE,
  GET_STORE,
  SET_YS_GACHA,
  SET_YS_GACHA_LIST,
  PUST_YS_GACHA_LIST,
  CLEAR_YS_GACHA_LIST,
  SET_USER_GACHA
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
  setFeedingFood(context, value) {
    context.commit(SET_CHICK_FEEDING_FOOD, value);
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
  async getUserData(context) {
    // 获取用户信息
    const result = await getUserInfo();
    console.log("************************************");
    console.log(result);
    console.log("************************************");
    if (result.code === 1) {
      context.commit(SET_USER,result.data);
      // 获取企鹅信息
      const result2 = await getChick();
      console.log("+++++++++++++++++++++++++++++++++++++");
      console.log(result2);
      console.log("+++++++++++++++++++++++++++++++++++++");
      if (result2.code === 1) {
        context.commit(SET_CHICK,result2.data[0]);
        // 获取任务
        context.dispatch('setTasks');
      }
    }
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
    console.log("测试下初始化任务");
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
    console.log("测试下领取任务");
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
  async reqGetUserStudy(context) {
    const result = await getUserStudy();
    console.log("测试下获取用户学习情况")
    console.log(result.data)
    if (result.code === 1) {
      console.log(result.data);
      context.commit(GET_USER_STUDY,result.data);
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
  // 设置卡池类型列表
  setYsGacha(context, value) {
    context.commit(SET_YS_GACHA, value);
  },
  // 设置卡池详情列表
  setYsGachaList(context, value) {
    context.commit(SET_YS_GACHA_LIST, value);
  },
  // 购买商品
  async reqClosingGood(context, value) {
    let obj = {
      type: value.type,
      price: value.price * value.num
    }
    const result = await postClosingGood(value);
    if (result.code == 0) {
      context.commit(DEDUCT_MONEY,obj);
      // 更新vuex用户商品信息
      context.commit(UPDATE_USER_GOODS,result.data);
      Message({
        message: '购买成功',
        type: 'success'
      });
      context.dispatch('reqAddTaskCount',{type: 2,count: 1});
    }
    // 第一次购买
    if (result.code == 2) {
      const result2 = await postFirstClosingGood(value);
      console.log(result2.data);
      if (result2.code == 0) {
        context.commit(DEDUCT_MONEY,obj);
        context.commit(ADD_USER_FOOD,result2.data);
        Message({
          message: '购买成功',
          type: 'success'
        });
        context.dispatch('reqAddTaskCount',{type: 2,count: 1});
      }
    }
  },
  // 扣除背包物品或道具
  async deductionFood(context, value) {
    const result = await deductionFood(value);
    console.log(result.data);
    if (result.code == 0) {
      context.commit(UPDATE_USER_FOODS,result.data);
    }
  },
  async reqAddTaskCount(context, value) {
    const result = await addTaskCount(value);
    if (result.code == 0) {
      context.commit(UPDATE_TASKS,result.data.data);
      if (result.data.tips.isOK) {
        Message({
          message: result.data.tips.text,
          type: 'success'
        });
      }
      console.log("任务增加次数成功");
    }
  },
  async reqSellFood(context, value) {
    const result = await postSellFood(value);
    console.log(result);
    if (result.code == 0) {
      // 增加资产
      let obj = {
        type: value.type,
        price: value.price * value.num
      }
      context.commit(SET_CURR_FOOD, result.data);
      context.commit(UPDATE_USER_FOODS, result.data);
      console.log(obj);
      context.commit(ADD_MONEY, obj);
    }
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
      context.dispatch('reqAddTaskCount',{type: 1,count: 1});
    }

  },
  // 进食结束(请求更新数据库)
  async endEat(context, value) {
    const result = await postChick(value.chick);
    if ( result.code == 0 ) {
      context.commit(SET_CHICK,result.data);
      const result2 = await postUser(value.user);
      console.log(result2);
    }
  },
  // 更新小鸡信息
  async reqUpdateChick(context, value) {
    const result = await postChick(value);
    if ( result.code == 0 ) {
      context.commit(SET_CHICK,result.data);
    }
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
        type: 2,
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
  },
  // 获取好友列表
  async getFriends(context) {
    const result = await getFriends();
    if (result.code == 0) {
      context.commit(GET_FRIENDS,result.data);
    }
  },
  // 获取好友资料
  async setCurrUser(context,value) {
    console.log(value);
    const result = await setCurrUser(value);
    console.log("获取好友资料");
    console.log(result);
    if (result.code == 0) {
      context.commit(SET_CURR_USER,result.data.user);
      context.commit(SET_CURR_USER_CHICK,result.data.chick);
    }
  },
  async saveProfile(context, value) {
    const result = await postProfile(value);
    if (result.code == 0) {
      context.commit(SET_USER,result.data);
      Message({
        message: '保存成功',
        type: 'success'
      });
    }
  },
  async saveName(context, value) {
    const result = await setName(value);
    if (result.code == 0) {
      console.log('xiugaimingcheng:====');
      console.log(result.data);
      context.commit(SET_USER,result.data);
      Message({
        message: '用户名修改成功',
        type: 'success'
      });
    }
  },
  // 抽奖
  async reqLuckDraw(context, value) {
    console.log(value);
    let luck = {
      name: '抽奖券',
      num: 1
    }
    const result = await postLuckDraw(value);
    console.log(result);
    if (result.code == 1002) {
      const result2 = await deductionFood(luck);
      console.log(result2);
      if (result2.code == 0) {
        context.commit(UPDATE_USER_FOODS,result2.data);
      }
    }
    if (result.code == 1003 ) {
      context.commit(ADD_MONEY,result.data);
      const result2 = await deductionFood(luck);
      console.log(result2);
      if (result2.code == 0) {
        context.commit(UPDATE_USER_FOODS,result2.data);
      }
    }
  },
  // 添加弹幕留言
  async reqAddBarrage(context, value) {
    const result = await addBarrage(value);
    if (result.code == 0) {
      console.log('测试添加留言弹幕到后台保存');
      console.log(result);
      // context.commit(DEDUCT_MONEY,obj);
      // // 更新vuex用户商品信息
      // context.commit(UPDATE_USER_GOODS,result.data);
      // Message({
      //   message: '购买成功',
      //   type: 'success'
      // });
      // context.dispatch('reqAddTaskCount',{type: 2,count: 1});
    }
  },
  // 获取原神卡池信息
  async getYsGacha(context, value) {
    const result = await getGacha(value);
    console.log('获取原神卡池信息：');
    console.log(result);
    if (result.retcode == 0) {
      const data = result.data.list;
      context.commit(SET_YS_GACHA,data);
      context.commit(CLEAR_YS_GACHA_LIST);
      data.forEach(item => {
        context.dispatch('getYsGachaDetail',{gacha_id: item.gacha_id,name: 'ysGacha'});
      })
    }
  },
  // 获取原神卡池详情信息
  async getYsGachaDetail(context, value) {
    const result = await ajax.getAllData('/hk4e/gacha_info/cn_gf01/' + value.gacha_id + '/zh-cn.json',value);
    context.commit(PUST_YS_GACHA_LIST,result);
  },
  // 读取抽卡统计数据
  async getUserGacha(context) {
    const result = await getUserGacha();
    console.log('初始化页面获取用户抽卡数据后返回：');
    console.log(result)
    if (result.code == 0) {
      context.commit(SET_USER_GACHA,result.data);
    }
  },
  // 抽卡保存统计数据
  async saveUserGacha(context, value) {
    const result = await setUserGacha(value);
    console.log('抽卡保存数据后返回：');
    console.log(result)
    if (result.code == 0) {
      context.commit(SET_USER_GACHA,result.data);
      context.dispatch('deductMoney',{type:2,price:value.countNum * 160});
    }
  },
}
