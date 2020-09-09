<template>
  <div class="main flex-column skin_b1">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>课本列表</h1>
    </div>
    <div class="box-content">
      <ul class="study-list">
        <li v-for="item in studyList" :key="item.id">
          <div class="sl-head">
            <span class="study-name">{{item.name}}</span>
            <span class="study-plan">{{item.plan}}%</span>
          </div>
          <div class="sl-plan"></div>
          <div class="sl-reward">
            <div>完成学习奖励:</div>
            <div><i class="el-icon-s-help"></i>{{item.rewardMoney}}</div>
            <div><i class="el-icon-trophy-1"></i>{{item.rewardGem}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import storage from '../plugins/storage'
import {mapGetters} from "vuex";
export default {
  name: 'Log',
  data() {
    return {
      studyName: '',
      studyList: []
    }
  },
  computed: {
    ...mapGetters([
      "chickStudy"
    ])
  },
  components: {
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      _this.studyName = _this.$route.params.studyName;
      console.log("studyName");
      console.log(_this.studyName);
      // 从缓存获取课本列表数据
      _this.initStudyList(_this.studyName);
    })
  },
  methods: {
    initStudyList(name) {
      let getStudy = storage.get('study');
      console.log("从缓存获取课本列表数据");
      console.log(getStudy);
      getStudy.forEach(item => {
        if(item.name == name) {
          this.studyList = item.classifyList;
        }
      });
    },
    returnIndex() {
      this.$router.push({
        path: '/index'
      });
    }
  }
}

</script>
