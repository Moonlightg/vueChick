<template>
  <div class="main flex-column skin_b1">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>社区鸡友</h1>
    </div>
    <div class="box-content">
      <ul class="user-list">
        <li v-for="item in friends" :key="item._id">
          <div class="user-info">
            <p class="user-tit">{{item.username}}</p></div>
          <div class="user-state">
            <span class="label-green" v-if="item.eat">进食中</span>
            <span class="label-grey" v-if="!item.eat">空闲</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'Friends',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      "friends"
    ])
  },
  components: {
    
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      // 加载系统用户列表
      _this.initFriends();
    })
  },
  methods: {
    initFriends() {
      this.$store.dispatch('getFriends');
    },
    returnIndex() {
      this.$router.push({
        path: '/index'
      });
    }
  }
}

</script>
