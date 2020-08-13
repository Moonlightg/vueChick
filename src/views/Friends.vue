<template>
  <div class="main flex-column skin_b2">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>社区鸡友</h1>
    </div>
    <div class="box-content">
      <ul class="user-list">
        <li v-for="item in friends" 
            :key="item._id"
            @click="friendsHome(item)">
          <div class="user-info flex">
            <div class="user-img">
              <img v-lazy="getImgUrl(item.img)">
            </div>
            <div class="user-txt">
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
      "friends",
      "userinfo",
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
    },
    friendsHome(user) {
      console.log(user.username);

      let name = user.username;
      if (name == this.userinfo.username) {
        this.$router.push({
          path: '/index'
        });
        return false;
      }
      this.$router.push({
        path: '/friendsHome',
        query:{name: name}
      });
    }
  }
}

</script>
