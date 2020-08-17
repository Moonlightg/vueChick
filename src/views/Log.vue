<template>
  <div class="main flex-column skin_b1">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>日志动态</h1>
    </div>
    <div class="box-content">
      <ul class="log-list">
        <li v-for="item in log" :key="item._id">
          <span v-if="item.log_type == 0" class="log-type"><i class="el-icon-user-solid"></i></span>
          <span v-if="item.log_type == 1" class="log-type bg-blue"><i class="el-icon-s-platform"></i></span>
          <span v-if="item.log_type == 2" class="log-type"><i class="el-icon-s-opportunity"></i></span>
          <span v-if="item.log_type == 3" class="log-type"><i class="el-icon-magic-stick"></i></span>
          <span v-if="item.log_type == 4" class="log-type"><i class="el-icon-shopping-cart-full"></i></span>
          <span v-if="item.log_type == 5" class="log-type bg-orange"><i class="el-icon-coin"></i></span>
          <span v-if="item.log_type == 6" class="log-type bg-blue"><i class="el-icon-tableware"></i></span>
          <span v-if="item.log_type == 7" class="log-type bg-blue"><i class="el-icon-watch-1"></i></span>
          <p class="log-tit">{{item.log_title}}</p>
          <p class="log-time">{{item.log_date}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'Log',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      "log"
    ])
  },
  components: {
    
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      // 加载动态列表
      _this.initLog();
    })
  },
  methods: {
    initLog() {
      this.$store.dispatch('getLog');
    },
    returnIndex() {
      this.$router.push({
        path: '/index'
      });
    }
  }
}

</script>
