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
      <div class="chick-content" style="opacity: 1">
        <!-- 企鹅 -->
        <div class="penguin eating">
          <div class="pen-body">
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
    </div>
  </div>
</template>
<script>
import SceneDay from '../components/scene/SceneDay.vue'     // 白天背景
import SceneNight from '../components/scene/SceneNight.vue' // 晚上背景

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
        path: '/friends'
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
