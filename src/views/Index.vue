<template>
  <div class="container" :class="{ beingskin: skinBox}" style="opacity: 1">
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
      <li @click="showTasks()"><span class="nav-icon"><i class="el-icon-medal"></i></span><span class="nav-name">任务</span></li>
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
        <!-- 鸡蛋 -->
        <Cegg 
          :eggnum="chick.eggNum" 
          :eggprogress="chick.eggProgress"  
          ref="paper"></Cegg>
      </div>
      <!-- 叶子 -->
      <Cleaf></Cleaf>
      <!-- 鸡饭碗 -->
      <Ctrough></Ctrough>
      <!-- chick -->
      <div class="chick" :class="{noeat:!chick.eat}">
        <!-- 进食倒计 -->
        <div class="countdown-box">
          <p class="countdown-text" :class="{active : !chick.eat }">{{textContent}}</p>
          <!-- 进食进度条 -->
          <div class="progress" v-if="progressValue != 0 && progressValue < 100">
            <div class="progress-content" :style="'width:' + progressValue + '%' "></div>
          </div>
        </div>
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
        <div class="wing-left2"></div>
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
                  <li v-for="good in goodsList"
                    :key="good.id" 
                    :class="{ isMask: good.num == 0 || good.unlock == 0}"
                    @click="showGood(good)">
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
                        @click.stop="unlockGoods(good)">
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
        <div class="popup-content popup-tabs-box">
          <el-tabs v-model="shopTabs2">
            <el-tab-pane label="食物" name="good">
              <div class="food-box">
                <ul class="food-list" v-if="userFoodsList.length != 0 ">
                  <li v-for="good in userFoodsList"
                    :key="good.id"
                    @click="showGood(good)" v-show="good.num != 0">
                    <div class="food-item">
                      <div class="food-img">
                        <img :src="getImgUrl(good.img)">
                      </div>
                      <p class="food-name">{{good.name}}</p>
                      <span class="food-num">{{good.num}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="道具" name="prop"></el-tab-pane>
          </el-tabs>
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

    <!-- 商品详情 -->

    <!-- 购买 -->
    <Upurchase 
      :purchaseDialog="purchaseDialog" 
      :currGood="currGood"
      @closeDialog="closeUpurchase" v-if="purchaseDialog"></Upurchase>

    <!-- 物品详情 -->
    <Ugooddetails
      :goodDialog="goodDialog"
      :currFood="currFood"
      @countdown="setCountdown(arguments)"
      @closeDialog="closeUgood" v-if="goodDialog"></Ugooddetails>

    <!-- 任务列表 -->
    <Utasks
      :taskDialog="taskDialog"
      @closeDialog="closeUtask" v-if="taskDialog"></Utasks>
  </div>
</template>

<script>
import storage from '../plugins/storage'
// 场景组件
import Csunlight from '../components/Csunlight.vue' // 太阳光
import Cpeak from '../components/Cpeak.vue'         // 山峰
import Cclouds from '../components/Cclouds.vue'     // 白云
import Cgrass from '../components/Cgrass.vue'       // 草地
import Chouse from '../components/Chouse.vue'       // 房子
import Cfence from '../components/Cfence.vue'       // 护栏
import Cbee from '../components/Cbee.vue'           // 蜜蜂鲜花
import Cegg from '../components/Cegg.vue'           // 鸡蛋
import Cleaf from '../components/Cleaf.vue'         // 叶子
import Ctrough from '../components/Ctrough.vue'     // 鸡饭碗
import Upersonal from '../components/Upersonal.vue' // 个人中心
import Upurchase from '../components/Upurchase.vue'   // 购买
import Ugooddetails from '../components/Ugooddetails.vue' // 物品详情
import Utasks from '../components/Utasks.vue' // 物品详情

import {mapGetters} from "vuex";
const moment = require("moment");
export default {
  name: 'Index',
  data() {
    return {
      dialogStatus: false,   // 个人中心弹出窗状态
      purchaseDialog: false, // 购买单个商品弹出窗状态
      goodDialog: false, // 物品详情弹窗
      taskDialog: false, // 任务列表弹窗
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
      shopTabs: 'good',
      shopTabs2: 'good',
      progressValue: 0, // 进度条
      textContent: 'Hello 嘿嘿嘿', // 进度条上方显示文字,
      modalLevel: false, // 升级弹窗,用于连续升级检测
    }
  },
  computed: {
    ...mapGetters([
      "isLogin",
      "userinfo",
      "goodsList",
      "userFoodsList",
      "currGood",
      "currFood",
      "chick",
      "tasks"
    ])
  },
  components: {
    Csunlight,
    Cpeak,
    Cclouds,
    Cgrass,
    Chouse,
    Cfence,
    Cbee,
    Cegg,
    Cleaf,
    Ctrough,
    Upersonal,
    Upurchase,
    Ugooddetails,
    Utasks
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      //_this.getChick();
      _this.init();
    })
  },
  methods: {
    // 初始化,
    init() {
      if (!this.isLogin) {
        // 提示欢迎回来
        this.$message({
          iconClass: 'el-icon-message-solid',
          dangerouslyUseHTMLString: true,
          customClass: 'welcome-message',
          message: '亲爱的<b>'+ this.userinfo.username +'</b>欢迎回来!'
        });
        this.$store.dispatch('setLogin');
      }
      // 页面加载读取缓存
      let getChick = storage.get('chick');
      this.$store.dispatch('setChick',getChick);
      console.log("初始化页面拿到小鸡");
      console.log(this.chick);
      // 判断小鸡是否在进食
      this.chickIsEat();
    },
    // 判断是否正在进食
    chickIsEat: function() {
        // 页面加载获取当前时间
        let loadDate = new Date().getTime();
        // 判断上一次是否进食结束
        let isEat = this.chick.eatEndTime - loadDate;
        if (isEat > 0) {
          // 拿到当时投喂的食物
          this.$store.dispatch('setCurrFood', storage.get('currFood'));
          this.chick.eat = true;
          this.countdown(loadDate, this.chick.eatEndTime);
        } else {
          this.chick.eat = false;
          this.chick.eatEndTime = '';
          this.textContent = "吃完了, 好饿!";
          this.$store.dispatch('setChick',this.chick);
          return;
        }
    },
    // 获取当前用户chick进食情况
    getChick() {
      this.$store.dispatch('reqChick');
    },
    // 获取用户信息
    getUser() {
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
        // 获取用户背包物品
        this.getUserFood();
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
    closeUgood() {
      this.goodDialog = false
    },
    closeUtask() {
      this.taskDialog = false
    },
    getGoods() {
      let _this = this;
      // 获取商品列表
      _this.$store.dispatch('reqGetGoods');
    },
    getUserFood() {
      let _this = this;
      // 获取用户背包物品
      _this.$store.dispatch('reqGetUserFood');
    },
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    // 查看任务列表
    showTasks(){
      var newDate = moment().format('YYYY-MM-DD');
      if (storage.get('tasks')){
        var taskTime = storage.get('tasks').time;
        if (taskTime != newDate) {
          this.$store.dispatch('setTasks');
        }
      } else {
        this.$store.dispatch('setTasks');
      }
      this.taskDialog = true;
    },
    // 解锁商品
    unlockGoods(good) {
      good.money = this.userinfo.money - good.unlockPrice;
      let _this = this;
      let html = "解锁该商品需要"+ good.unlockPrice + "元";
      _this.$confirm(html, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (good.unlockPrice > _this.userinfo.money ) {
          _this.$message({
            message: '您的金币不足!',
            type: 'error'
          });
        } else {
          // 解锁商品
          _this.$store.dispatch('reqUnlock',good);
        }
      }).catch(() => {
        console.log("取消解锁");         
      });
    },
    // 查看物品详情
    showGood(good) {
      this.$store.dispatch('setCurrFood', good);
      this.goodDialog = true;
      console.log(good);
    },
    // 购买商品
    showShop(name) {
      console.log(name);
      this.$store.dispatch('setCurrGood', name);
      this.purchaseDialog = true;
    },
    // 设置倒计时
    setCountdown(data) {
      // data[0]投喂时的时间
      // data[0]投喂时计算后的结束时间
      // 开始计算倒计时
      this.countdown (data[0], data[1]);
    },
    countdown(startTime, endTime) {
      let self = this;
      let es = endTime - startTime;
      let delay = 100/self.currFood.eatTime*1000; // 计算每秒走的进度
      console.log("计算每秒走的进度:"+delay+"%");
      if (es > 0) {
        let timer = setInterval (function() {
          let nowTime = new Date().getTime();
          let t = endTime - nowTime;
          let value = (self.currFood.eatTime - t)/1000 * delay; // 计算进度条
          console.log("计算进度条:"+value+"%");
          if (value <= 100) {
            self.progressValue = value
          } else {
            self.progressValue = 100;
          }
          console.log("t:"+t+"进度条："+value+"%");
          if (t > 0) {
            self.chick.eat = true;
            let day = Math.floor(t/86400000);
            let hour=Math.floor((t/3600000)%24);
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = '';
            if (day > 0) {
              format = `${day}天${hour}小时${min}分${sec}秒`;
            } 
            if (day <= 0 && hour > 0 ) {
              format = `${hour}小时${min}分${sec}秒`; 
            }
            if (day <= 0 && hour <= 0) {
              format =`${min}分${sec}秒`;
            }
            self.textContent = format; // 显示倒计时
            //self.$store.dispatch('savegame');
          } else {
            clearInterval(timer); // 清除定时器
            // 喂食结束
            console.log("喂食结束");
            self.textContent = '我吃完了...';
            self.settleExp();
          }
        },1000)
      }
    },
    // 喂食结束结算
    settleExp() {
      // 进食结束时间清零
      this.chick.eatEndTime = '';
      this.chick.eat = false;
      // 经验结算
      this.chick.eggAddExps = parseInt(this.currFood.exp/this.chick.eggBase); // 鸡蛋经验加成 = 食物经验/基数, 取整数
      let ep = this.chick.eggProgress += this.chick.eggAddExps;
      console.log("鸡蛋进度条增加后："+ ep);
      this.chick.eggExps = this.chick.exp + this.currFood.exp;
      console.log("小鸡经验增加后为："+ this.chick.eggExps);
      this.$store.dispatch('reqUpdateChick',this.chick);
      // 弹出鸡蛋加成
      this.$refs.paper.popAdd(this.chick.eggAddExps+'%');
      // 升级计算
      if (this.chick.eggExps >= this.chick.upgradeExp) {
        this.chick.level += 1;
        this.chick.exp = this.chick.eggExps - this.chick.upgradeExp;
        this.chick.upgradeExp = parseInt(this.chick.upgradeExp * 2); // 提高升级所需经验
        this.modalLevel = true;
        // 生成鸡蛋个数计算
        this.settleEgg(ep);
      }
    },
    // 生成鸡蛋个数计算
    settleEgg(ep){
      if (ep > 100) {
        console.log("鸡蛋进度条:"+ep);
        let eggNum = parseInt(ep/100);
        this.chick.eggNum += eggNum;
        console.log("生成的鸡蛋数："+this.chick.eggNum);
        this.chick.eggProgress = ep - eggNum * 100;
        console.log("剩余的鸡蛋经验值："+this.chick.eggProgress);
        this.$store.dispatch('reqUpdateChick',this.chick);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
