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
        <div class="penguin">
          <div class="pen-body">
            <div class="pen-eye"></div>
            <div class="pen-blusher"></div>
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
<style lang="less">
@brand_primary: #374961;
.penguin {
  position: absolute;
  bottom: 17%;
  left: 50%;
  margin-left: -50px;
  width: 100px;
  height: 150px;
  &::after,
  &::before {
    position: absolute;
    content: "";
    width: 12%;
    height: 5px;
    border-radius: 5px 5px 0 0;
    background: #FFC107;
    bottom: 0;
    z-index: 2;
  }
  &::after {
    left: 30%;
  }
  &::before {
    right: 30%;
  }
}
.pen-body {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @brand_primary;
  border-radius: ~'80% 60% 40% 40% / 90% 90% 60% 60%';
  &::after,
  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &::before {
    bottom: 7%;
    width: 86%;
    height: 86%;
    border-radius: ~'70% 60% 40% 40% / 90% 90% 50% 50%';
    background: #dde4ee;
  }
  &::after {
    left: 49%;
    bottom: 13%;
    width: 73%;
    height: 78%;
    border-radius: ~'84% 62% 40% 40% / 90% 90% 50% 50%';
    background: #fff;
    z-index: 2;
  }
}
.pen-eye {
  position: absolute;
  top: 17%;
  left: 29%;
  width: 42%;
  height: 1em;
  z-index: 3;
  &::before, 
  &::after {
    position: absolute;
    content: '';
    top: 50%;
    width: .5em;
    height: .5em;
    margin-top: -.25em;
    border-radius: 50%;
    background-color: #302217;
  }
  &::before {
    left: 11%;
    background-image: radial-gradient(circle at .1em .2em, #ffffff 0.1em, transparent 0.1em);
  }
  &::after {
    right: 3%;
    background-image: radial-gradient(circle at .1em .2em, #ffffff 0.1em, transparent 0.1em);
  }
}
.pen-blusher {
  position: absolute;
  top: 25%;
  left: 29%;
  width: 42%;
  height: 1em;
  background: #F90;
  z-index: 3;
}
</style>
