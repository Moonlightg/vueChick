import storage from '../plugins/storage'
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
  SET_CURR_GOOD,
  SET_CURR_FOOD,
  LOGIN_OUT,
  SET_CHICK,
  GET_GOODS,
  GET_USER_GOODS,
  GET_USER_FOODS,
  UPDATE_USER_GOODS,
  UPDATE_USER_FOODS,
  INFO_TASKS,
  UPDATE_TASKS,
  SET_STORE,
  GET_STORE
} from './mutation-types'

export default {
  [SET_LOGIN](state) {
    state.isLogin = true;
    storage.set('isLogin', true);
  },
  [SET_LOG](state, log) {
    state.log = log;
  },
  [DEDUCT_MONEY](state,money) {
    state.userinfo.money = state.userinfo.money - money;
  },
  [UPDATE_MONEY](state,newMoney) {
    state.userinfo.money = newMoney;
  },
  [UPDATE_GEM](state,newGem) {
    state.userinfo.gem = newGem;
  },
  [UPDATE_GOODS_UNLOCK](state, name) {
    state.goodsList.forEach(itemData => {
      if(itemData.name === name) {
        itemData.unlock = 1;
      }
    });
  },
  // [UPDATE_CHICK](state, chick) {
  //   state.chick.eat = chick.eat;
  //   state.chick.eatEndTime = chick.eatEndTime;
  //   state.chick.eatTime = chick.eatTime;
  //   state.chick.exp = chick.exp;
  //   state.chick.level = chick.level;
  //   state.chick.upgradeExp = chick.upgradeExp
  // },
  [SET_TOKEN](state, token) {
    state.token = token;
    storage.set('token', token);
  },
  [SET_USERINFO](state, value) {
    state.userinfo = value.user;
    state.chick = value.chick;
    state.token = value.token;
    storage.set('userinfo',state.userinfo);
    storage.set('chick', state.chick);
    storage.set('token', state.token);
    console.log('store、localstorage中保存用户信息成功！');
  },
  [SET_CURR_GOOD](state, good) {
    state.goodsList.forEach(obj => {
      if (obj.name === good) {
        state.currGood = obj
      }
    })
  },
  [SET_CURR_FOOD](state, food) {
    state.currFood = food;
    storage.set('currFood',state.currFood);
  },
  [LOGIN_OUT](state) {
    storage.removeAll(); // 清除缓存
    state.token = '',
    state.userinfo = {};
    state.tasks = {};
    state.isLogin = false;
  },
  [SET_CHICK](state,chick) {
    state.chick = chick;
    storage.set('chick', state.chick);
    console.log('小鸡信息缓存成功！');
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
  [GET_USER_FOODS](state,{userFoodsList}) {
    state.userFoodsList = [];
    state.userFoodsList2 = [];
    userFoodsList.forEach(item => {
      if(item.type == 1) {
        state.userFoodsList.push(item);
      } else if (item.type == 2) {
        state.userFoodsList2.push(item);
      }
    });
  },
  [UPDATE_USER_GOODS](state,good) {
    // 遍历比较更新前端界面显示
    console.log("good");
    console.log(good);
    state.goodsList.forEach(item => {
      if(item.name === good.name) {
        item.num = good.num;
      }
    })
  },
  [UPDATE_USER_FOODS](state,food) {
    // 遍历比较更新前端界面显示
    console.log("food");
    console.log(food);
    state.userFoodsList2.forEach(item => {
      if(item.name === food.name) {
        item.num = food.num;
      }
    })
  },
  [INFO_TASKS](state, value) {
    state.tasks = value;
    storage.set('tasks', value);
    console.log('保存tasks成功！');
  },
  [UPDATE_TASKS](state, value) {
    state.tasks = value;
    storage.set('tasks', value);
    console.log('更新tasks缓存成功！');
  },
  // 在缓存中存储state
  [SET_STORE](state) {
    storage.set('store',state);
  },
  // 读取缓存中的state
  [GET_STORE](state,value) {
    storage.get(value);
  }
}