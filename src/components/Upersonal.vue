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
      <span class="profile-mask" @click="hideProfile"></span>
      <div class="profile-box">
        <span class="close-i" @click="hideProfile"><i class="el-icon-error"></i></span>
        <div class="profile-item-list">
          <div class="profile-item" 
            v-for="item in profile" 
            :key="item.id"
            :class="{on:item.img == userinfo.img}"
            @click="setProfile(item.img)">
            <div class="user-img">
              <img :src="getImgUrl(item.img)">
            </div>
            <i class="success-i el-icon-success"></i>
          </div>
        </div>
        <div class="profile-footer">
          <el-button type="primary" @click="saveProfile">保存</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
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
      currProfile: '',
      profile: [{
        id: 1000,
        img: 'profile.jpg'
      },{
        id: 1001,
        img: 'profile1.jpg'
      },{
        id: 1002,
        img: 'profile2.jpg'
      },{
        id: 1003,
        img: 'profile3.jpg'
      },{
        id: 1004,
        img: 'profile4.jpg'
      },{
        id: 1005,
        img: 'profile5.jpg'
      },{
        id: 1006,
        img: 'profile6.jpg'
      },{
        id: 1007,
        img: 'profile7.jpg'
      },{
        id: 1008,
        img: 'profile8.jpg'
      },{
        id: 1009,
        img: 'profile9.jpg'
      },{
        id: 1010,
        img: 'profile10.jpg'
      },{
        id: 1011,
        img: 'profile11.jpg'
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
    },
    hideProfile() {
      this.isProfile = false;
    },
    setProfile(value) {
      this.currProfile = value;
    },
    saveProfile(){
      var obj = {
        img: this.currProfile
      }
      this.$store.dispatch('saveProfile', obj);
    }
  }
}

</script>
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
    z-index: 2;
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
    position: relative;
    width: 25%;
    border-right: 1px solid #dfcdc7;
    border-bottom: 1px solid #dfcdc7;
  }
  .profile-item:hover{
    background: #e0d1cc;
  }
  .profile-item.on:hover {
    background: #fff;
  }
  .profile-item .user-img {
    margin: 5px auto;
  }
  .profile-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .profile-footer {
    margin: 15px auto 0;
    text-align: center;
  }
  .close-i {
    position: absolute;
    top: -6px;
    right: -6px;
    font-size: 1.6rem;
    color: #409eff;
  }
  .success-i {
    display: none;
    position: absolute;
    top: 3px;
    right: 3px;
    color: #7bb537;
  }
  .profile-item.on .success-i {
    display: block;
  }
</style>