// state
export default {
  // 存储token
  // token: storage.get('token') ? storage.get('token') : '',
  token:'',       // token
  userinfo: {},   // 用户信息
  isLogin: false, // 登录状态
  goodsList: [],  // 商品列表  
  userGoodsList: [], // 当前用户商品列表
  userFoodsList: [], // 当前用户背包食物列表
  userFoodsList2: [], // 当前用户背包道具列表
  currGood: {},   // 当前选中的商品
  currFood: {},   // 当前选中的食物
  chick: {},      // 小鸡信息
  tasks: {},  // 每日任务列表
}
