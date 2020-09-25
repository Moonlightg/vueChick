// state
export default {
  // 存储token
  // token: storage.get('token') ? storage.get('token') : '',
  isInit: false,   // 初始化同步远程数据
  log:[],         // 动态日志
  token:'',       // token
  userinfo: {},   // 用户信息
  isLogin: false, // 登录状态
  goodsList: [],  // 商店食物列表  
  goodsList2: [], // 商店道具列表
  userGoodsList: [], // 当前用户商品列表
  userFoodsList: [], // 当前用户背包食物列表
  userFoodsList2: [], // 当前用户背包道具列表
  currSkin: {},   // 当前选中的皮肤
  currGood: {},   // 当前选中的商品
  currFood: {},   // 当前选中的食物
  currUser: {},   // 当前好友资料
  currUserChick: {}, // 当前好友小鸡资料
  feedingFood: {},// 当前喂食食物
  chick: {},      // 小鸡信息
  chickSkin: {},  // 小鸡皮肤
  chickStudy: [], // 小鸡学历
  tasks: {},  // 每日任务列表
  friends: [] // 好友列表
}
