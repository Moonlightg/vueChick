<template>
  <div class="container">
    <div class="content" :class="{'bg-night':isNight}" >
      <div class="box-head">
        <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
        <h1>画一只企鹅</h1>
      </div>
      <!-- 白天背景 -->
      <scene-day v-if="hoursType == 0 || hoursType == 1"></scene-day>
      <!-- 晚上背景 -->
      <scene-night v-if="hoursType == 2"></scene-night>
      <div class="chick-content penguin-list" style="opacity: 1">
        <!-- 正常的企鹅 -->
        <penguin-default></penguin-default>
        <!-- 进食的企鹅 -->
        <penguin-eating></penguin-eating>
      </div>
    </div>
  </div>
</template>
<script>
import SceneDay from '../components/scene/SceneDay.vue'     // 白天背景
import SceneNight from '../components/scene/SceneNight.vue' // 晚上背景

import PenguinDefault from '../components/penguin/PenguinDefault.vue' // 默认状态的企鹅
import PenguinEating from '../components/penguin/PenguinEating.vue' // 进食状态的企鹅

import {mapGetters} from "vuex";
export default {
  name: 'Penguin',
  data() {
    return {
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
    PenguinDefault,
    PenguinEating
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      _this.getMycount();
    })
  },
  methods: {
    returnIndex() {
      this.$router.push({
        path: '/index'
      });
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
    }
  }
}

</script>
<style lang="less">
  .penguin-list .penguin{
    left: 60px;
    &.eating {
      left: 50%;
    }
  }
</style>