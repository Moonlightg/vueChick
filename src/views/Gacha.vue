<template>
  <div class="main flex-column skin_b2">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>抽卡</h1>
    </div>
    <div class="box-content">
      <div class="gacha-list">
        <div class="gacha-list-item" v-for="item in gachaList" :key="item.gacha_id">
          <p>卡池：{{item.gacha_name}}</p>
          <p>时间：{{item.begin_time}} - {{item.end_time}}</p>
          <p>卡池id: {{item.gacha_id}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
	.gacha-list {
		padding: 20px;
	}
	.gacha-list-item {
		margin: 10px 0;
		padding: 20px;
		background: #ffeaca;
		border: 1px solid #fff;
	}
	.gacha-list-item p {
		text-align: left;
	}
</style>
<script>
import {mapGetters} from "vuex";
export default {
  name: 'Gacha',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      "userinfo",
      "gachaList"
    ])
  },
  components: {

  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      // 获取原神官网卡池信息
    _this.getOfficialGacha();
    })
  },
  methods: {
    getOfficialGacha() {
      var _this = this;
      // 原神实时卡池信息
      // 请求的参数对象
      var paramsObj = {
        name: 'ysGacha'
      };
      _this.$store.dispatch('getYsGacha',paramsObj);
	}
  }
}

</script>
