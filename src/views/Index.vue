<template>
  <div class="container" :class="{ beingskin: maskBox}" style="opacity: 1">
    <!-- 个人信息简介 -->
    <div class="user-box" @click="opendialog">
      <div class="user-logo">
        <div class="user-img">
          <img v-lazy="getImgUrl(userinfo.img)">
        </div>
      </div>
      <div class="user-info">
        <div class="user-name">{{userinfo.username}}</div>
        <div class="user-money">
          <div class="user-mi"><i class="el-icon-s-help"></i></div>
          <p>{{userinfo.money}}</p>
          <div class="user-mi c-blue"><i class="el-icon-trophy-1"></i></div>
          <p class="c-blue">{{userinfo.gem}}</p>
        </div>
      </div>
    </div>

    <!-- 功能菜单 left -->
    <ul class="nav-list nav-l">
      <li class="n-violet" @click="goLog()"><span class="nav-icon"><i class="el-icon-bell"></i></span><span class="nav-name">动态</span></li>
      <li class="n-violet" @click="goFriends()"><span class="nav-icon"><i class="el-icon-user-solid"></i></span><span class="nav-name">圈子</span></li>
      <li class="n-violet" @click="goPenguin()"><span class="nav-icon"><i class="el-icon-s-opportunity"></i></span><span class="nav-name">企鹅</span></li>
      <!-- <li class="n-violet"><span class="nav-icon"><i class="el-icon-s-data"></i></span><span class="nav-name">农场</span></li> -->
    </ul>
    <!-- 功能菜单 -->
    <ul class="nav-list">
      <li @click="showPopup(skin)"><span class="nav-icon"><i class="el-icon-brush"></i></span><span class="nav-name">换装</span></li>
      <li @click="showPopup(shop)"><span class="nav-icon"><i class="el-icon-shopping-bag-1"></i></span><span class="nav-name">商店</span></li>
      <li @click="showPopup(bag)"><span class="nav-icon"><i class="el-icon-suitcase"></i></span><span class="nav-name">背包</span></li>
      <li @click="showTasks()" :class={on:tasks.isUpdate}><span class="nav-icon"><i class="el-icon-medal"></i></span><span class="nav-name">任务</span></li>
      <li @click="showPopup(study)" class="n-green"><span class="nav-icon"><i class="el-icon-collection"></i></span><span class="nav-name">学习</span></li>
    </ul>
    <div class="content" :class="{'bg-night':isNight}" >
      <!-- 白天背景 -->
      <scene-day v-if="hoursType == 0 || hoursType == 1"></scene-day>
      <!-- 晚上背景 -->
      <scene-night v-if="hoursType == 2" ></scene-night>
      <div class="chick-content" style="opacity: 1">
        <!-- chick -->
        <!-- 企鹅 -->
        <div class="penguin" :class="{eating:chick.eat}">
          <!-- 进食倒计 -->
          <div class="countdown-box">
            <p class="countdown-text" :class="{active : !chick.eat }">{{textContent}}</p>
            <!-- 进食进度条 -->
            <div class="progress" v-if="progressValue != 0 && progressValue < 100">
              <div class="progress-content" :style="'width:' + progressValue + '%' "></div>
            </div>
          </div>
          <div class="pen-body">
            <!-- 装扮-帽子 -->
            <div class="skin-hat">
              <keep-alive>
                <component
                  :is="chick.skinHat"></component>
              </keep-alive>
            </div>
            <!-- 装扮-衣服 -->
            <div class="skin-clothes">
              <keep-alive>
                <component
                  :is="chick.skinClothes"></component>
              </keep-alive>
            </div>
            <div class="pen-eye"></div>
            <div class="pen-blusher"></div>
            <div class="pen-mouth"></div>
            <div class="pen-mouth2"></div>
            <div class="food">
              <p></p>
              <div class="dot-box">
                <span></span>
                <span></span>
              </div>
            </div>
            <div class="pen-wing"></div>
          </div>
        </div>
        <!-- 鸡蛋 -->
        <Cegg
          :eggnum="chick.eggNum"
          :eggprogress="chick.eggProgress"
          ref="paper"></Cegg>
      </div>
      <!-- 弹窗遮罩层 -->
      <div class="popup-mask" v-show="maskBox" @click="hidePopup"></div>
    </div>

    <!-- 功能弹窗面板 -->
    <div class="page-popup">
      <!-- 换装 -->
      <div class="popup-item" v-show="isSkin">
        <div class="popup-head border-bottom-1px">
          <span class="popup-title fl">换装</span>
          <i class="el-icon-error" @click="hidePopup"></i>
        </div>
        <div class="popup-content popup-tabs-box">
          <el-tabs v-model="shopTabs1">
            <el-tab-pane label="套装" name="skin-suits">
              <ul class="opt-list">
                <li
                  v-for="item in chickSkin[0].list"
                  :key="item.skinName"
                  @click="showSkin(item)">
                  <div class="skin-img"
                    :class="[{mask:item.skinState === 0},{active:item.skinState === 2}]">
                    <img v-lazy="getImgUrl(item.img)">
                    <span class="diff">{{item.diff}}</span>
                    <span class="use-badge">使用中</span>
                  </div>

                  <span class="skin-name">{{item.skinName}}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="帽子" name="skin-hats">
              <ul class="opt-list">
                <li
                  v-for="item in chickSkin[1].list"
                  :key="item.skinName"
                  @click="showSkin(item)">
                  <div class="skin-img"
                    :class="[{mask:item.skinState === 0},{active:item.skinState === 2}]">
                    <img v-lazy="getImgUrl(item.img)">
                    <span class="diff">{{item.diff}}</span>
                    <span class="use-badge">使用中</span>
                  </div>
                  <span class="skin-name">{{item.skinName}}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="上衣" name="skin-clothes">
              <ul class="opt-list">
                <li
                  v-for="item in chickSkin[2].list"
                  :key="item.skinName"
                  @click="showSkin(item)">
                  <div class="skin-img"
                    :class="[{mask:item.skinState === 0},{active:item.skinState === 2}]">
                    <img v-lazy="getImgUrl(item.img)">
                    <span class="diff">{{item.diff}}</span>
                    <span class="use-badge">使用中</span>
                  </div>
                  <span class="skin-name">{{item.skinName}}</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 商店 -->
      <div class="popup-item" v-show="isShop">
        <div class="popup-head border-bottom-1px">
          <span class="popup-title fl">商店</span>
          <i class="el-icon-error" @click="hidePopup"></i>
        </div>
        <div class="popup-content popup-tabs-box">
          <el-tabs v-model="shopTabs2">
            <el-tab-pane label="食物" name="good">
              <div class="food-box">
                <ul class="food-list">
                  <li v-for="good in goodsList"
                    :key="good.id"
                    :class="{ isMask: good.num == 0 || good.unlock == 0}"
                    @click="showGood(good)">
                    <div class="food-item">
                      <div class="food-img">
                        <img v-lazy="getImgUrl(good.img)">
                      </div>
                      <p class="food-name">{{good.name}}</p>
                      <span class="food-num" v-if="good.num !== 0">{{good.num}}</span>
                      <div class="mask-bg shortage-tips"
                        v-if="good.num == 0 && good.unlock == 1"
                        @click.stop="showShop(good)">
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
            <el-tab-pane label="道具" name="prop">
              <div class="food-box">
                <ul class="food-list col-2">
                  <li v-for="good in goodsList2"
                    :key="good.id"
                    @click="showShop(good)">
                    <div class="food-item flex">
                      <div class="food-img">
                        <img v-lazy="getImgUrl(good.img)">
                      </div>
                      <div class="food-txt flex-column flex-info">
                        <p class="food-name">{{good.name}}</p>
                        <p class="food-price"><i class="el-icon-trophy-1"></i>{{good.price}}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
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
          <el-tabs v-model="shopTabs3">
            <el-tab-pane label="食物" name="good">
              <div class="food-box">
                <ul class="food-list" v-if="userFoodsList.length != 0 ">
                  <li v-for="good in userFoodsList"
                    :key="good.id"
                    @click="showGood(good)">
                    <div class="food-item">
                      <div class="food-img">
                        <img v-lazy="getImgUrl(good.img)">
                      </div>
                      <p class="food-name">{{good.name}}</p>
                      <span class="food-num">{{good.num}}</span>
                    </div>
                  </li>
                </ul>
                <Nodata v-if="userFoodsList.length == 0 "></Nodata>
              </div>
            </el-tab-pane>
            <el-tab-pane label="道具" name="prop">
              <div class="food-box">
                <ul class="food-list col-2" v-if="userFoodsList2.length != 0 ">
                  <li v-for="good in userFoodsList2"
                    :key="good.id"
                    @click="showGood(good)" v-show="good.num != 0">
                    <div class="food-item">
                      <div class="food-img">
                        <img v-lazy="getImgUrl(good.img)">
                      </div>
                      <div class="food-txt flex-column flex-info">
                        <p class="food-name">{{good.name}}</p>
                        <p class="food-price">拥有{{good.num}}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
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
          <p style="display: none;">功能开发中...</p>
          <ul class="study-nav">
            <li v-for="item in chickStudy" :key="item.id" @click="goStudyList(item.name)">
              <span class="sn-bg" :style="'width:'+ item.plan +'%;'"></span>
              <span class="sn-name">{{item.name}}</span>
              <span class="sn-plan">{{item.plan}}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 个人中心 -->
    <Upersonal
      :dialogStatus="dialogStatus"
      @opendialog="opendialog"
      @closeDialog="closeHandle"
      @signOut="loginOut" v-show="dialogStatus"></Upersonal>

    <!-- 商品详情 -->

    <!-- 购买 -->
    <Upurchase
      :purchaseDialog="purchaseDialog"
      :currGood="currGood"
      @closeDialog="closeUpurchase" v-if="purchaseDialog"></Upurchase>

    <!-- 出售 -->
    <Usell
      :sellDialog="sellDialog"
      :currFood="currFood"
      @closeDialog="closeUsell" v-if="sellDialog"></Usell>

    <!-- 物品详情 -->
    <Ugooddetails
      :goodDialog="goodDialog"
      :currFood="currFood"
      @countdown="setCountdown(arguments)"
      @closeDialog="closeUgood"
      @showSell="showSell"
      @use="useFood(arguments)"  v-if="goodDialog"></Ugooddetails>

    <!-- 皮肤详情 -->
    <Uskindetails
      :skinDialog="skinDialog"
      :currSkin="currSkin"
      @closeDialog="closeUskin" v-if="skinDialog"></Uskindetails>

    <!-- 任务列表 -->
    <Utasks
      :taskDialog="taskDialog"
      @closeDialog="closeUtask" v-if="taskDialog"></Utasks>
  </div>
</template>

<script>
import storage from '../plugins/storage'
// 场景组件
import Cegg from '../components/Cegg.vue'                   // 鸡蛋
import SceneDay from '../components/scene/SceneDay.vue'     // 白天背景
import SceneNight from '../components/scene/SceneNight.vue' // 晚上背景
import Upersonal from '../components/Upersonal.vue'         // 个人中心
import Upurchase from '../components/Upurchase.vue'         // 购买
import Usell from '../components/Usell.vue'                 // 出售
import Uskindetails from '../components/Uskindetails.vue'   // 皮肤详情
import Ugooddetails from '../components/Ugooddetails.vue'   // 物品详情
import Utasks from '../components/Utasks.vue'               // 物品详情
import Nodata from '../components/Nodata.vue'               // 暂无数据

// 皮肤组件
import Clothesdefault from '../components/chickskin/Clothesdefault.vue'
import Clothesforg from '../components/chickskin/Clothesforg.vue'
import Clothestribe from '../components/chickskin/Clothestribe.vue'
import Clothesshenli from '../components/chickskin/Clothesshenli.vue'
import Hatdefault from '../components/chickskin/Hatdefault.vue'
import Hatforg from '../components/chickskin/Hatforg.vue'
import Hattribe from '../components/chickskin/Hattribe.vue'
import Hatshenli from '../components/chickskin/Hatshenli.vue'
import Hatpainter from '../components/chickskin/Hatpainter.vue'



import {mapGetters} from "vuex";
const moment = require("moment");
export default {
  name: 'Index',
  data() {
    return {
      dialogStatus: false,   // 个人中心弹出窗状态
      purchaseDialog: false, // 购买单个商品弹出窗状态
      sellDialog: false, // 出售物品
      skinDialog: false, // 皮肤详情弹窗
      goodDialog: false, // 物品详情弹窗
      taskDialog: false, // 任务列表弹窗
      modalAchievement: false,
      maskBox: false,
      isNight: false,
      skin: 'skin',
      shop: 'shop',
      bag: 'bag',
      study: 'study',
      isSkin: false,
      isShop: false,
      isBag: false,
      isStudy: false,
      shopTabs1: 'skin-suits',
      shopTabs2: 'good',
      shopTabs3: 'good',
      progressValue: 0, // 进度条
      textContent: 'Hello 嘿嘿嘿', // 进度条上方显示文字,
      hoursType: '', // 0上午,1下午,2晚上
      hoursTip:'', // 上午好,下午好,晚上好
      timer: '', // 喂食定时器
      Hat: 'Hatpainter'
    }
  },
  computed: {
    ...mapGetters([
      "isLogin",
      "userinfo",
      "goodsList",
      "goodsList2",
      "userFoodsList",
      "userFoodsList2",
      "currSkin",
      "currGood",
      "currFood",
      "feedingFood",
      "chick",
      "chickSkin",
      "chickStudy",
      "tasks"
    ])
  },
  components: {
    Cegg,
    SceneDay,
    SceneNight,
    Upersonal,
    Upurchase,
    Usell,
    Uskindetails,
    Ugooddetails,
    Utasks,
    Nodata,
    Clothesforg,
    Clothesdefault,
    Clothestribe,
    Clothesshenli,
    Hatforg,
    Hatdefault,
    Hattribe,
    Hatshenli,
    Hatpainter
  },
  created: function () {
    if(storage.get('token') === 'null'){
      this.$router.push({
        path: '/login'
      });
    } else {
      // 每次刷新都先通过token获取用户信息
      // this.$store.dispatch('getUserData');
    }
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      // 初始化
      _this.init();
      // 初始化任务列表
      _this.initTask();
    })
  },
  methods: {
    // 初始化,
    init() {
      // 判断是上午,下午还是晚上
      this.getMycount();
      let isLogin = storage.get('isLogin');
      if(storage.get('token') === 'null'){
        this.$router.push({
          path: '/login'
        });
      } else if (!isLogin)  {
        // 登陆后提示一次欢迎回来
        this.$message({
          iconClass: 'el-icon-message-solid',
          dangerouslyUseHTMLString: true,
          customClass: 'welcome-message',
          message: '<b>'+ this.userinfo.username +'</b>'+this.hoursTip+'!欢迎回来！'
        });
        this.$store.dispatch('setLogin');
      }
      // 鸡的缓存在登录时已经保存过了
      let getChick = storage.get('chick');
      this.$store.dispatch('setChick',getChick);
      // 获取皮肤数据
      this.getSkins();
      // 判断小鸡是否在进食
      this.chickIsEat();
    },
    initTask() {
      var newDate = moment().format('YYYY-MM-DD');
      if (storage.get('tasks')){
        var taskTime = storage.get('tasks').time;
        if (taskTime != newDate) {
          this.$store.dispatch('setTasks');
        }
      } else {
        this.$store.dispatch('setTasks');
      }
    },
    getMycount() {
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.hoursType = 0;
        this.hoursTip = "上午好"
        this.isNight = false;
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.hoursType = 1;
        this.hoursTip = "下午好";
        this.isNight = false;
      } else {
        this.hoursType = 2;
        this.hoursTip = "晚上好";
        this.isNight = true;
      }
    },
    // 判断是否正在进食
    chickIsEat() {
        // 页面加载获取当前时间
        let loadDate = new Date().getTime();
        console.log("当前时间戳");
        console.log(loadDate);
        // 判断上一次是否进食结束
        let isEat = this.chick.eatEndTime - loadDate;
        if (isEat > 0) {
          this.chick.eat = true;
          this.goodsList.forEach(item => {
            if(item.name == this.chick.eatFood) {
              this.$store.dispatch('setFeedingFood',item);
              this.countdown(loadDate, this.chick.eatEndTime);
            }
          });
        } else {
          // 找到最后喂食的食物
          this.goodsList.forEach(item => {
            if(item.name == this.chick.eatFood) {
              this.$store.dispatch('setFeedingFood',item);
              // 计算经验
              this.settleExp();
              this.textContent = "吃完了, 好饿!";
            }
          });
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
      this.$store.dispatch("addLog", {log_type: 2,log_title: '退出登录!'});
      this.$store.dispatch("loginOut");
      // 退出登录跳转到登录界面
      this.$router.push({
        path: '/login'
      });
    },
    // 打开功能菜单弹窗
    showPopup(val) {
      this.maskBox = true;

      if (val == 'skin') {
        this.isSkin = true;
      } else if (val == 'shop') {
        this.isShop = true;
        // 获取商品数据
        this.getGoods();
      } else if (val == 'study') {
        this.isStudy = true;
        this.getUserStudy();
      } else {
        this.isBag = true;
        // 获取用户背包物品
        this.getUserFood();
      }
    },
    // 关闭功能菜单弹窗
    hidePopup() {
      this.maskBox = false;
      var that = this;
      setTimeout(function(){
        that.isSkin = false;
        that.isShop = false;
        that.isBag = false;
        that.isStudy = false;
      }, 400);
    },
    showAchievement() { this.modalAchievement = true;},
    hideAchievement() { this.modalAchievement = false;},
    opendialog() { this.dialogStatus = true},
    closeHandle() { this.dialogStatus = false},
    closeUpurchase() { this.purchaseDialog = false},
    closeUsell() {
      this.sellDialog = false,
      this.goodDialog = false;
    },
    closeUskin() { this.skinDialog = false},
    closeUgood() { this.goodDialog = false},
    closeUtask() { this.taskDialog = false},
    getSkins() {
      // 获取皮肤数据
      this.$store.dispatch('reqGetSkins');
    },
    getGoods() {
      // 获取商品数据
      this.$store.dispatch('reqGetGoods');
    },
    getUserFood() {
      // 获取用户背包物品
      this.$store.dispatch('reqGetUserFood');
    },
    getUserStudy() {
      // 获取用户学习进度
      this.$store.dispatch('reqGetUserStudy');
    },
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    // 查看任务列表
    showTasks(){
      this.initTask();
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
          _this.$store.dispatch("addLog", {log_type: 3,log_title: '解锁了'+good.name});
        }
      }).catch(() => {
        console.log("取消解锁");
      });
    },
    // 查看皮肤详情
    showSkin(skin) {
      console.log(skin);
      this.$store.dispatch('setCurrSkin', skin);
      console.log(this.currSkin);
      this.skinDialog = true;
    },
    // 查看物品详情
    showGood(good) {
      this.$store.dispatch('setCurrFood', good);
      this.goodDialog = true;
    },
    // 购买商品
    showShop(good) {
      console.log(good);
      this.$store.dispatch('setCurrGood', good);
      this.purchaseDialog = true;
    },
    // 出售物品
    showSell() {
      this.sellDialog = true;
    },
    // 设置倒计时
    setCountdown(data) {
      // data[0]投喂时的时间
      // data[1]投喂时计算后的结束时间
      // 开始计算倒计时
      this.countdown (data[0], data[1]);
    },
    useFood(data) {
      let name = data[0];
      switch(name) {
        case '抽奖券':
          this.$router.push({
            path: '/luckDraw'
          });
          break;
        case '1小时加速卡':
          // 判断是否在进食(还在进食中就执行使用加速卡)
          // 使用加速卡(更新小鸡喂食结束时间,更新背包物品)
          // 使用加速卡已达到喂食结束条件则更新后直接进行喂食结束计算
          this.useAcceleratorCard("1小时加速卡",3600000);
          break;
        default:
          console.log(name);
      }
    },
    // 使用加速卡道具
    useAcceleratorCard(name,time){
      let tit = "使用了"+name
      if(this.chick.eat) {
        let loadDate = new Date().getTime();
        // 新的进食结束时间
        let newEatEndTime = this.chick.eatEndTime - time;
        let isEat = newEatEndTime - loadDate;
        if (isEat>0) {
          // 停止旧倒计时
          clearInterval(this.timer);
          // 设置新倒计时
          this.countdown(loadDate, newEatEndTime);
          // 更新小鸡进食结束时间(newEatEndTime);
          this.chick.eatEndTime = newEatEndTime;
          this.$store.dispatch('reqUpdateChick',this.chick);
        } else {
          clearInterval(this.timer);
          this.progressValue = 0;
          this.textContent = "吃完了, 好饿!";
          this.settleExp();
          this.$message({
            message: tit,
            type: 'success'
          });
        }
        // 扣除物品(name)
        let obj = {
          name: name,
          num: 1
        }
        this.$store.dispatch('deductionFood',obj);
        this.goodDialog = false;
        this.hidePopup();
      } else {
        this.$message({
          message: '当前没有进食,无需使用加速卡',
          type: 'error'
        });
        return false;
      }
    },
    countdown(startTime, endTime) {
      let self = this;
      let es = endTime - startTime;
      let delay = 100/self.feedingFood.eatTime*1000; // 计算每秒走的进度
      if (es > 0) {
        self.timer = setInterval (function() {
          let nowTime = new Date().getTime();
          let t = endTime - nowTime;
          let value = (self.feedingFood.eatTime - t)/1000 * delay; // 计算进度条
          if (value <= 100) {
            self.progressValue = value
          } else {
            self.progressValue = 100;
          }
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
            if (day <= 0 && hour <= 0 && min <= 0) {
              format =`${sec}秒`;
			}
            self.textContent = format; // 显示倒计时
            //self.$store.dispatch('savegame');
          } else {
            clearInterval(self.timer); // 清除定时器
            // 喂食结束
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
      this.chick.eatFood = '';
      this.userinfo.eat = false;
      // 经验结算
      // (要重新定义当前喂食的食物,因为在喂食中操作了其他物品会重置currFood,所以用feedingFood代替);
      this.chick.eggAddExps = parseInt(this.feedingFood.exp/this.chick.eggBase); // 鸡蛋经验加成 = 食物经验/基数, 取整数
      let ep = this.chick.eggProgress += this.chick.eggAddExps;
      this.chick.exp = this.chick.exp + this.feedingFood.exp;
      // 弹出鸡蛋加成
      this.$refs.paper.popAdd(this.chick.eggAddExps+'%');
      // 生成鸡蛋个数计算
      this.settleEgg(ep);
      // 升级计算
      this.settleLevel();
    },
    // 生成鸡蛋个数计算
    settleEgg(ep){
      if (ep >= 100) {
        let eggNum = parseInt(ep/100);
        this.chick.eggNum += eggNum;
        this.chick.eggProgress = ep - eggNum * 100;
      }
    },
    // 小鸡升级计算
    settleLevel() {
      if (this.chick.exp >= this.chick.upgradeExp) {
        this.chick.level += 1;
        this.chick.exp = this.chick.exp - this.chick.upgradeExp;
        this.chick.upgradeExp = parseInt(this.chick.upgradeExp * 2); // 提高升级所需经验
        this.$store.dispatch('endEat',{chick:this.chick,user:this.userinfo});
        this.$confirm('恭喜你升级了,'+this.chick.level+'级!', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'success',
          center: true
        }).then(() => {
          this.settleLevel();
        })
      } else {
        this.$store.dispatch('endEat',{chick:this.chick,user:this.userinfo});
      }
    },
    // 跳转到动态
    goLog() {
      this.$router.push({
        path: '/log'
      });
    },
    goFriends() {
      this.$router.push({
        path: '/friends'
      });
    },
    goPenguin() {
      this.$router.push({
        path: '/penguin'
      });
    },
    goStudyList(studyName) {
      console.log(studyName);
      this.$router.push({
        // path: '/studyList'
        name: 'StudyList',
        params: {
          studyName: studyName
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
