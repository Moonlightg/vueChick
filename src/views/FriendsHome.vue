<template>
  <div class="container">
    <div class="content" :class="{'bg-night':isNight}" >
      <div class="box-head">
        <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
        <h1>{{currUser.username}}</h1>
        <div class="user-img">
          <img :src="getImgUrl(currUser.img)">
        </div>
      </div>
      <!-- 功能菜单 -->
      <ul class="nav-list friends-nav">
        <li @click="showPopup"><span class="nav-icon"><i class="el-icon-brush"></i></span><span class="nav-name">留言</span></li>
      </ul>
      <!-- 白天背景 -->
      <scene-day v-if="hoursType == 0 || hoursType == 1"></scene-day>
      <!-- 晚上背景 -->
      <scene-night v-if="hoursType == 2"></scene-night>
      <div class="chick-content" style="opacity: 1">
        <!-- chick -->
        <div class="penguin" :class="{eating:currUserChick.eat}">
          <!-- 进食倒计 -->
          <div class="countdown-box">
            <p class="countdown-text" :class="{active : !currUserChick.eat }">{{textContent}}</p>
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
                  :is="currUserChick.skinHat"></component>
              </keep-alive>
            </div>
            <!-- 装扮-衣服 -->
            <div class="skin-clothes">
              <keep-alive>
                <component
                  :is="currUserChick.skinClothes"></component>
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
      </div>
      <!-- 弹窗遮罩层 -->
      <div class="popup-mask" v-show="isLeave" @click="hidePopup"></div>
    </div>

    <!-- 留言弹窗 -->
    <div class="leave-box" v-show="isLeave">
      <div class="popup-head border-bottom-1px">
        <span class="popup-title fl">留言</span>
        <i class="el-icon-error" @click="hidePopup"></i>
      </div>
      <div class="leave-form">
        <div class="msg-form">
          <el-input v-model.trim="msg" placeholder="请输入弹幕内容" @keyup.enter="setData()"></el-input>
          <el-button type="primary" @click="addToList">确定留言</el-button>
		</div>
      </div>
    </div>

    <vue-baberrage
      :isShow= "barrageIsShow"
      :barrageList = "barrageList"
      :loop = "barrageLoop">
    </vue-baberrage>

  </div>
</template>
<script>
import SceneDay from '../components/scene/SceneDay.vue'     // 白天背景
import SceneNight from '../components/scene/SceneNight.vue' // 晚上背景

// 皮肤组件
import Clothesdefault from '../components/chickskin/Clothesdefault.vue'
import Clothesforg from '../components/chickskin/Clothesforg.vue'
import Hatdefault from '../components/chickskin/Hatdefault.vue'
import Hatforg from '../components/chickskin/Hatforg.vue'

import { MESSAGE_TYPE } from 'vue-baberrage'

import {mapGetters} from "vuex";
export default {
  name: 'FriendsHome',
  data() {
    return {
      progressValue: 0, // 进度条
      textContent: 'Hello 嘿嘿嘿', // 进度条上方显示文字,
      isNight: false,
      hoursType: '', // 0上午,1下午,2晚上
      isLeave: false,
      msg: null, //弹幕文字
      top: null, //距离顶部高度
      dzState: true, //控制图片替换
      screenHeight: 600, //显示区域
      currentId: 0,
      barrageIsShow: true,
      barrageLoop: false,
      barrageList: [],
      barrageUserImg: '',
    }
  },
  computed: {
    ...mapGetters([
      "userinfo",
      "currUser",
      "currUserChick"
    ])
  },
  components: {
    SceneDay,
    SceneNight,
    Clothesforg,
    Clothesdefault,
    Hatforg,
    Hatdefault
  },
  created: function() {
    var _this = this;
    _this.$nextTick(function () {
      console.log(_this.$route.query.name);
      _this.getMycount();
      _this.setUserImg();
      _this.setCurrUser(_this.$route.query.name);
    })
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      _this.initBarrage();
    })
  },
  methods: {
    /**
     * 初始化留言数据
     */
    initBarrage(){
      var _this = this;
      _this.currUser.barrage.forEach(item => {
        var obj = {
          id: item.id,
          avatar: item.avatar,
          msg: item.msg,
          time: parseInt(Math.floor(Math.random() * (15 - 5)) + 5),
          type: MESSAGE_TYPE.NORMAL
		};
        _this.barrageList.push(obj);
      });
      console.log(_this.barrageList);
	},
    /**
     * @addToList 发送弹幕事件
     * @obj 每一条弹幕
     */
    addToList () {
      var obj = {
        uid: this.currUser._id,
        id: this.currentId++,
        avatar: this.barrageUserImg,
        msg: this.msg,
      };
      var barrageItem = obj;
      barrageItem.time = 5;
      barrageItem.type = MESSAGE_TYPE.NORMAL;
      this.barrageList.push(barrageItem);
      // 后台添加弹幕数据
      // 这里要传递给谁留言，所以要传递接收留言的用户_id
      this.$store.dispatch('reqAddBarrage',obj);
    },

    returnIndex() {
      this.$router.push({
        path: '/friends'
      });
    },
    setUserImg() {
      this.barrageUserImg = this.getImgUrl(this.userinfo.img);
	},
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    getMycount() {
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.hoursType = 0;
        this.isNight = false;
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.hoursType = 1;
        this.isNight = false;
      } else {
        this.hoursType = 2;
        this.isNight = true;
      }
    },
    setCurrUser(name) {
      var obj = {
        name: name
      }
      this.$store.dispatch('setCurrUser',obj);
    },
    showPopup() {
      this.isLeave = true;
    },
    hidePopup() {
      this.isLeave = false;
    }
  }
}

</script>
