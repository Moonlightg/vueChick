<template>
  <div class="main flex-column skin_b1">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>日志动态</h1>
    </div>
    <div class="box-content">
      <ul class="log-list">
        <li v-for="item in log" :key="item._id">
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
