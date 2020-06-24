<template>
  <el-dialog
    title="个人中心"
    :visible.sync="dialogStatus"
    width="80%"
    center
    :before-close="handleClose">
    <div class="card-box">
      <div class="card-user flex">
        <div class="user-img" @click="shouProfile">
          <img :src="getImgUrl(userinfo.img)">
          <span class="btn-ms">更换</span>
        </div>
        <div class="user-txt flex-info flex-column">
          <h3>{{userinfo.username}}<span><i class="el-icon-edit"></i>改名</span></h3>
          <div class="user-money">
            <div class="user-mi"><i class="el-icon-s-help"></i></div>
            <p>{{userinfo.money}}</p>
            <div class="user-mi c-blue"><i class="el-icon-trophy-1"></i></div>
            <p class="c-blue">{{userinfo.gem}}</p>
          </div>
        </div>
      </div>
      <p><span class="card-label">注册时间:</span>{{userinfo.register_date}}</p>
      <p><span class="card-label">最近登录:</span>{{userinfo.update_date}}</p>
    </div>
    <div class="card-box">
      <h3>小鸡档案</h3>
      <p><span class="card-label">等级:</span>{{chick.level}}</p>
      <p><span class="card-label">当前经验:</span>{{chick.exp}}</p>
      <p><span class="card-label">升级经验:</span>{{chick.upgradeExp}}</p>
      <p><span class="card-label">进食状态:</span><span v-if="chick.eat">进食中...</span><span v-if="!chick.eat">挨饿中...</span></p>
      <p><span class="card-label">总产蛋量:</span>{{chick.eggTotal}}</p>
      <p><span class="card-label">待拾蛋量:</span>{{chick.eggNum}}</p>
      <p><span class="card-label">鸡蛋进度:</span>{{chick.eggProgress}}%</p>
      <p><span class="card-label">帽子皮肤:</span>{{chick.skinHat}}</p>
      <p><span class="card-label">衣服皮肤:</span>{{chick.skinClothes}}</p>
    </div>
    <!-- <div class="card-box">
      <h3>庄园信息-小鸭</h3>
    </div>
    <div class="card-box">
      <h3>庄园信息-小树</h3>
    </div> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="signOutClose">退出登录</el-button>
    </span>

    <!-- 更换头像 -->
    <div class="profile-wrap" v-show="isProfile">
      <span class="profile-mask"></span>
      <div class="profile-box">
        <div class="profile-item-list">
          <div class="profile-item" v-for="item in profile" :key="item.id">
            <div class="user-img">
              <img :src="getImgUrl(item.img)">
            </div>
          </div>
        </div>
        <div class="profile-footer">
          <el-button type="danger" @click="signOutClose">确定</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style type="text/css">
  .profile-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9
  }
  .profile-box {
    background: #fff;
    margin: 0 auto;
    border: 2px solid #966c2c;
    border-radius: 10px;
    padding: 15px;
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    transform: translate3d(0, -56%, 0);
  }
  .profile-item-list{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    border-top: 1px solid #dfcdc7;
    border-left: 1px solid #dfcdc7;
  }
  .profile-item {
    width: 25%;
    border-right: 1px solid #dfcdc7;
    border-bottom: 1px solid #dfcdc7;
  }
  .profile-item .user-img {
    margin: 5px auto;
  }
  .profile-footer {
    margin: 15px auto 0;
    text-align: center;
  }
</style>
<script>

import {mapGetters} from "vuex";
export default {
  name: 'Personal',
  props: {
    dialogStatus: {
      type: Boolean
    }
  },
  data () {
    return {
      isProfile: false,
      profile: [{
        id: 1,
        img: 'profile.jpg'
      },{
        id: 2,
        img: 'profile.jpg'
      },{
        id: 3,
        img: 'profile.jpg'
      },{
        id: 4,
        img: 'profile.jpg'
      },{
        id: 5,
        img: 'profile.jpg'
      },{
        id: 6,
        img: 'profile.jpg'
      },{
        id: 7,
        img: 'profile.jpg'
      },{
        id: 8,
        img: 'profile.jpg'
      }]
    }
  },
  computed: {
    ...mapGetters(["userinfo","chick"])
  },
  mounted: function() {
    console.log(this.userinfo);
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog') // 取消和 x 按钮的事件，防止重复操作createDialog变量
    },
    signOutClose() {
      this.$emit('signOut')
    },
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    shouProfile() {
      this.isProfile = true;
    }
  }
}

</script>
