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
      <!-- 白天背景 -->
      <scene-day v-if="hoursType == 0 || hoursType == 1"></scene-day>
      <!-- 晚上背景 -->
      <scene-night v-if="hoursType == 2"></scene-night>
      <div class="chick-content" style="opacity: 1">
        <!-- chick -->
        <div class="chick" :class="{noeat:!currUserChick.eat}">
          <!-- 进食倒计 -->
          <div class="countdown-box">
            <p class="countdown-text" :class="{active : !currUserChick.eat }">{{textContent}}</p>
            <!-- 进食进度条 -->
            <div class="progress" v-if="progressValue != 0 && progressValue < 100">
              <div class="progress-content" :style="'width:' + progressValue + '%' "></div>
            </div>
          </div>
          <!-- 装扮-帽子 -->
          <div class="skin-hat">
            <keep-alive>
              <component
                :is="currUserChick.skinHat"></component>
            </keep-alive>
          </div>
          <div class="chick-head"></div>
          <div class="chick-body">
            <!-- 装扮-衣服 -->
            <keep-alive>
              <component
                :is="currUserChick.skinClothes"></component>
            </keep-alive>
          </div>
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
      </div>
    </div>
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

import {mapGetters} from "vuex";
export default {
  name: 'FriendsHome',
  data() {
    return {
      progressValue: 0, // 进度条
      textContent: 'Hello 嘿嘿嘿', // 进度条上方显示文字,
      isNight: false,
      hoursType: '', // 0上午,1下午,2晚上
    }
  },
  computed: {
    ...mapGetters([
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
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      console.log(_this.$route.query.name);
      _this.getMycount();
      _this.setCurrUser(_this.$route.query.name);
    })
  },
  methods: {
    returnIndex() {
      this.$router.push({
        path: '/friends'
      });
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
    }
  }
}

</script>
