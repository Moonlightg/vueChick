//import state from './state'

export default {
  // getters 只会依赖 state 中的成员去更新
  token: (state) => state.token,
  userinfo: (state) => state.userinfo,
  isLogin :(state) => state.isLogin,
  goodsList :(state) => state.goodsList,
  userGoodsList :(state) => state.userGoodsList,
  userFoodsList :(state) => state.userFoodsList,
  userFoodsList2 :(state) => state.userFoodsList2,
  currGood :(state) => state.currGood,
  currFood :(state) => state.currFood,
  chick :(state) => state.chick,
  tasks :(state) => state.tasks
}
