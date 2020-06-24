import storage from '../plugins/storage'
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
  SET_CURR_GOOD,
  SET_CURR_FOOD,
  LOGIN_OUT,
  SET_CHICK,
  SET_CHICK_SKIN,
  SET_CHICK_FEEDING_FOOD,
  GET_GOODS,
  SET_CURR_SKIN,
  GET_USER_GOODS,
  GET_USER_FOODS,
  UPDATE_USER_GOODS,
  UPDATE_USER_FOODS,
  UPDATE_USER_SKINS,
  ADD_USER_FOOD,
  GET_USER_SKINS,
  INFO_TASKS,
  UPDATE_TASKS,
  GET_FRIENDS,
  SET_STORE,
  GET_STORE
} from './mutation-types'

export default {
  [SET_LOGIN](state) {
    state.isLogin = true;
    storage.set('isLogin', true);
  },
  [SET_LOG](state, log) {
    let logList = log.logList.reverse();
    state.log = logList;
    console.log("state.log");
    console.log(state.log);
  },
  [DEDUCT_MONEY](state,value) {
    if (value.type == 1) {
      state.userinfo.money = state.userinfo.money - value.price;
      
    } else {
      state.userinfo.gem = state.userinfo.gem - value.price;
    }
  },
  [ADD_MONEY](state,value) {
    if (value.type == 1) {
      state.userinfo.money = state.userinfo.money + value.price;
    } else {
      state.userinfo.gem = state.userinfo.gem + value.price;
    }
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
  [SET_USER](state, value) {
    state.userinfo = value;
    storage.set('userinfo',state.userinfo);
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
  [SET_CURR_SKIN](state, skin) {
    state.currSkin = skin;
    console.log(state.currSkin);
  },
  [SET_CURR_GOOD](state, good) {
    if (good.type == 1) {
      state.goodsList.forEach(obj => {
        if (obj.name === good.name) {
          state.currGood = obj
        }
      })
    } else {
      state.goodsList2.forEach(obj => {
        if (obj.name === good.name) {
          state.currGood = obj
        }
      })
    }
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
  [SET_CHICK_SKIN](state,skin) {
    state.chickSkin = skin;
    storage.set('skin', state.chickSkin);
  },
  [SET_CHICK_FEEDING_FOOD](state, value) {
    console.log("当前喂食食物");
    console.log(value);
    state.feedingFood = value;
  },
  [GET_GOODS](state,{goodsList}) {
    state.goodsList = goodsList;
    state.goodsList = [];
    state.goodsList2 = [];
    goodsList.forEach(item => {
      if(item.type == 1 ) {
        state.goodsList.push(item);
      } else if (item.type == 2 ) {
        state.goodsList2.push(item);
      }
    });
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
      if(item.type == 1 && item.num > 0) {
        state.userFoodsList.push(item);
      } else if (item.type == 2 && item.num > 0) {
        state.userFoodsList2.push(item);
      }
    });
  },
  [GET_USER_SKINS](state, skin){
    state.chickSkin = skin.skinList;
    storage.set('skin', state.chickSkin);
  },
  [UPDATE_USER_GOODS](state,good) {
    state.goodsList.forEach(item => {
      if(item.name === good.name) {
        item.num = good.num;
      }
    })
  },
  [UPDATE_USER_FOODS](state,food) {
    state.userFoodsList2.forEach(item => {
      if(item.name === food.name) {
        item.num = food.num;
      }
    })
  },
  [ADD_USER_FOOD](state,food) {
    state.userFoodsList2.push(food);
    console.log(state.userFoodsList2);
  },
  [UPDATE_USER_SKINS](state,skin) {
    state.chickSkin = skin.skinList;
    state.chickSkin.forEach(item => {
      item.list.forEach(docs => {
        if(docs.skinName === state.currSkin.skinName) {
          state.currSkin = docs;
        }
      })  
    })
    storage.set('skin', state.chickSkin);
    console.log(skin);
    console.log(state.currSkin);
    console.log(state.chickSkin);
  },
  [INFO_TASKS](state, value) {
    state.tasks = value
    storage.set('tasks', state.tasks);
    console.log('保存tasks成功！');
  },
  [UPDATE_TASKS](state, value) {
    state.tasks = value;
    storage.set('tasks', state.tasks);
    console.log('更新tasks缓存成功！');
  },
  [GET_FRIENDS](state, value) {
    state.friends = value;
    storage.set('friends',state);
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