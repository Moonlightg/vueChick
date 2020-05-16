//import state from './state'

export default {
  // getters 只会依赖 state 中的成员去更新
  token: (state) => state.token,
  userinfo: (state) => state.userinfo,
  isLogin :(state) => state.isLogin,
  goodsList :(state) => state.goodsList,
  currGood :(state) => state.currGood,
  chick :(state) => state.chick
}
