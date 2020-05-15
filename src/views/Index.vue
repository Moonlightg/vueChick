<template>
  <div class="container" :class="{ beingskin: skinBox}">
    <div class="user-box" @click="opendialog">
      <div class="user-logo">
        <div class="user-level">{{userinfo.level}}</div>
        <span class="portrait-item portrait0"></span>
      </div>
      <div class="user-info">
        <div class="user-name">{{userinfo.username}}</div>
        <div class="user-money">
          <div class="user-mi"><i class="el-icon-s-help"></i></div>
          <p>{{userinfo.money}}</p>
        </div>
      </div>
    </div>
    <!-- 功能菜单 -->
    <ul class="nav-list">
      <li @click="showPopup(skin)"><span class="nav-icon"><i class="el-icon-brush"></i></span><span class="nav-name">换装</span></li>
      <li @click="showPopup(shop)"><span class="nav-icon"><i class="el-icon-shopping-bag-1"></i></span><span class="nav-name">商店</span></li>
      <li @click="showPopup(bag)"><span class="nav-icon"><i class="el-icon-suitcase"></i></span><span class="nav-name">背包</span></li>
      <li @click="showAchievement()"><span class="nav-icon"><i class="el-icon-medal"></i></span><span class="nav-name">勋章</span></li>
      <li @click="showPopup(study)" class="n-green"><span class="nav-icon"><i class="el-icon-collection"></i></span><span class="nav-name">学习</span></li>
    </ul>
    <div class="content">
      <!-- 太阳光 -->
      <Csunlight></Csunlight>
      <!-- 山峰 -->
      <Cpeak></Cpeak>
      <!-- 白云 -->
      <Cclouds></Cclouds>
      <div class="land-wrap">
        <!-- 草地 -->
        <Cgrass></Cgrass>
        <!-- 房子 -->
        <Chouse></Chouse>
        <!-- 护栏 -->
        <Cfence></Cfence>
        <!-- 蜜蜂鲜花 -->
        <Cbee></Cbee>
      </div>
      <!-- 叶子 -->
      <Cleaf></Cleaf>
      <!-- 鸡饭碗 -->
      <Ctrough></Ctrough>
      <!-- chick -->
      <div class="chick">
        <div class="chick-head"></div>
        <div class="chick-body"></div>
        <div class="eye">
          <span></span>
          <span></span>
        </div>
        <div class="blusher">
          <span></span>
          <span></span>
        </div>
        <div class="face"></div>
        <div class="wing-left"></div>
        <div class="wing-content">
          <span></span>
        </div>
        <div class="wing-right">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="food">
            <p></p>
            <div class="dot-box">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="mouth">
          <span></span>
          <span></span>
          <p></p>
        </div>
        <div class="foot">
          <span></span>
          <span></span>
        </div>
      </div>
      <!-- 弹窗遮罩层 -->
      <div class="popup-mask" v-show="skinBox" @click="hidePopup"></div>
    </div>
    
    <!-- 功能弹窗面板 -->
    <div class="page-popup">
      <!-- 换装 -->
      <div class="popup-item" v-show="isSkin">
        <div class="popup-head border-bottom-1px">
          <span class="popup-title fl">换装</span>
          <i class="el-icon-error" @click="hidePopup"></i>
        </div>
        <div class="popup-content">
          换装
        </div>
      </div>
      <!-- 商店 -->
      <div class="popup-item" v-show="isShop">
        <div class="popup-head border-bottom-1px">
          <span class="popup-title fl">商店</span>
          <i class="el-icon-error" @click="hidePopup"></i>
        </div>
        <div class="popup-content popup-tabs-box">
          <el-tabs v-model="shopTabs">
            <el-tab-pane label="食物" name="good">
              <div class="food-box">
                <ul class="food-list">
                  <li v-for="good in goodsList" :key="good.id" :class="{ isMask: good.num == 0 || good.unlock == 0}">
                    <div class="food-item">
                      <div class="food-img">
                        <img :src="getImgUrl(good.img)">
                      </div>
                      <p class="food-name">{{good.name}}</p>
                      <span class="food-num" v-if="good.num !== 0">{{good.num}}</span>
                      <div class="mask-bg shortage-tips" 
                        v-if="good.num == 0 && good.unlock == 1" 
                        @click.stop="showShop(good.name)">
                        <el-button type="success" size="mini">购买</el-button>
                      </div>
                      <div class="mask-bg shortage-tips" 
                        v-if="good.unlock == 0" 
                        @click.stop="unlockGoods(good.name,good.unlockPrice)">
                        <el-button type="warning" size="mini">解锁</el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="道具" name="prop">道具</el-tab-pane>
          </el-tabs>
          
        </div>
      </div>
      <!-- 背包 -->
      <div class="popup-item" v-show="isBag">
        <div class="popup-head border-bottom-1px">
          <span class="popup-title fl">背包</span>
          <i class="el-icon-error" @click="hidePopup"></i>
        </div>
        <div class="popup-content">
          背包
        </div>
      </div>
      <!-- 学习 -->
      <div class="popup-item" v-show="isStudy">
        <div class="popup-head border-bottom-1px">
          <span class="popup-title fl">学习</span>
          <i class="el-icon-error" @click="hidePopup"></i>
        </div>
        <div class="popup-content">
          学习
        </div>
      </div>
    </div>

    <!-- 个人中心 -->
    <Upersonal 
      :dialogStatus="dialogStatus" 
      @opendialog="opendialog" 
      @closeDialog="closeHandle" 
      @signOut="loginOut"></Upersonal>

    <!-- 购买 -->
    <Upurchase 
      :purchaseDialog="purchaseDialog" 
      :currGood="currGood"
      @closeDialog="closeUpurchase"></Upurchase>
  </div>
</template>

<script>
// 场景组件
import Csunlight from '../components/Csunlight.vue' // 太阳光
import Cpeak from '../components/Cpeak.vue'         // 山峰
import Cclouds from '../components/Cclouds.vue'     // 白云
import Cgrass from '../components/Cgrass.vue'       // 草地
import Chouse from '../components/Chouse.vue'       // 房子
import Cfence from '../components/Cfence.vue'       // 护栏
import Cbee from '../components/Cbee.vue'           // 蜜蜂鲜花
import Cleaf from '../components/Cleaf.vue'         // 叶子
import Ctrough from '../components/Ctrough.vue'     // 鸡饭碗
import Upersonal from '../components/Upersonal.vue' // 个人中心
import Upurchase from '../components/Upurchase.vue'   // 购买

import {mapGetters} from "vuex";
export default {
  name: 'Index',
  data() {
    return {
      dialogStatus: false,   // 个人中心弹出窗状态
      purchaseDialog: false, // 购买单个商品弹出窗状态
      modalAchievement: false,
      skinBox: false,
      skin: 'skin',
      shop: 'shop',
      bag: 'bag',
      study: 'study',
      isSkin: false,
      isShop: false,
      isBag: false,
      isStudy: false,
      //goodsList: [],
      userGoodsList: [],
      shopTabs: 'good'
    }
  },
  computed: {
    ...mapGetters(["userinfo","goodsList","currGood"])
  },
  components: {
    Csunlight,
    Cpeak,
    Cclouds,
    Cgrass,
    Chouse,
    Cfence,
    Cbee,
    Cleaf,
    Ctrough,
    Upersonal,
    Upurchase
  },
  mounted: function() {
    this.$nextTick(function () {
      this.getChick();
      this.getUser();
    })
  },
  methods: {
    // 获取当前用户chick进食情况
    getChick() {
      _this.$store.dispatch('reqChick');
    },
    // 获取用户信息
    getUser() {
      //this.user.username = "test";
      // this.$ajax.get('/api/users/info').then((res) => {
      //   console.log(res);
      // });
      var aaa = this.userinfo;
      console.log(aaa);
    },
    // 退出登录
    loginOut() {
      // 清除用户数据
      this.$store.dispatch("loginOut");
      // 退出登录跳转到登录界面
      this.$router.push({
        path: '/login'
      });
    },
    // 打开功能菜单弹窗
    showPopup: function (val) {
      this.skinBox = true;
      if (val == 'skin') {
        this.isSkin = true;
      } else if (val == 'shop') {
        this.isShop = true;
        // 获取商品列表
        this.getGoods();
      } else if (val == 'study') {
        this.isStudy = true;
      } else {
        this.isBag = true;
      }
    },
    // 关闭功能菜单弹窗
    hidePopup: function () {
      this.skinBox = false;
      var that = this;
      setTimeout(function(){ 
        that.isSkin = false;
        that.isShop = false;
        that.isBag = false;
        that.isStudy = false;
      }, 400);
    },
    showAchievement: function() {
      this.modalAchievement = true;
    },
    hideAchievement: function() {
      this.modalAchievement = false;
    },
    opendialog() {
      this.dialogStatus = true
    },
    closeHandle() {
      this.dialogStatus = false
    },
    closeUpurchase() {
      this.purchaseDialog = false
    },
    getGoods() {
      let _this = this;
      // 获取商品列表
      _this.$store.dispatch('reqGetGoods');
    },
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    // 解锁商品
    unlockGoods(name,unlockPrice) {
      let _this = this;
      let html = "解锁该商品需要"+ unlockPrice + "元";
      _this.$confirm(html, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (unlockPrice > _this.userinfo.money ) {
          _this.$message({
            message: '您的金币不足!',
            type: 'error'
          });
        } else {
          const obj = {
            name: name,
            money: _this.userinfo.money - unlockPrice
          };
          // 解锁商品
          _this.$store.dispatch('reqUnlock',obj);
        }
      }).catch(() => {
        console.log("取消解锁");         
      });
    },
    // 购买商品
    showShop(name) {
      console.log(name);
      this.$store.dispatch('setCurrGood', name);
      this.purchaseDialog = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
