//import state from './state'

export default {
  // getters 只会依赖 state 中的成员去更新
  log: (state) => state.log,
  token: (state) => state.token,
  userinfo: (state) => state.userinfo,
  isLogin :(state) => state.isLogin,
  goodsList :(state) => state.goodsList,
  goodsList2 :(state) => state.goodsList2,
  userGoodsList :(state) => state.userGoodsList,
  userFoodsList :(state) => state.userFoodsList,
  userFoodsList2 :(state) => state.userFoodsList2,
  currSkin :(state) => state.currSkin,
  currGood :(state) => state.currGood,
  currFood :(state) => state.currFood,
  feedingFood :(state) => state.feedingFood,
  chick :(state) => state.chick,
  chickSkin :(state) => state.chickSkin,
  tasks :(state) => state.tasks
}
