<template>
  <div class="main flex-column skin_b2">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>社区鸡友</h1>
    </div>
    <div class="box-content">
      <ul class="user-list">
        <li v-for="item in friends" :key="item._id">
          <div class="user-info flex">
            <div class="user-img">
              <img :src="getImgUrl(item.img)">
            </div>
            <div>
              <p class="user-tit">{{item.username}}</p>
            </div>
          </div>
          <div class="user-state">
            <span class="label-green" v-if="item.eat">进食中</span>
            <span class="label-grey" v-if="!item.eat">空闲</span>
            <!-- <span>{{item.level}}级</span> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style type="text/css">
  .user-info.flex {
    display: flex;
    align-items: center;
  }
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    overflow: hidden;
    margin-right: 15px;
    border: 1px solid #f2ddd5;
  }
  .user-img img {
    width: 100%;
  }
</style>
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
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    returnIndex() {
      this.$router.push({
        path: '/index'
      });
    }
  }
}

</script>
