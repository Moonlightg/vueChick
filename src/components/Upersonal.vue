<template>
  <el-dialog
    title="个人中心"
    :visible.sync="dialogStatus"
    width="80%"
    center
    :before-close="handleClose">
    <div class="card-box">
      <h3>个人信息</h3>
      <p><span class="card-label">用户名:</span>{{userinfo.username}}</p>
      <p><span class="card-label">注册时间:</span>{{userinfo.register_date}}</p>
      <p><span class="card-label">最近登录:</span>{{userinfo.update_date}}</p>
      <p><span class="card-label">金币:</span>{{userinfo.money}}</p>
      <p><span class="card-label">宝石:</span>{{userinfo.gem}}</p>
    </div>
    <div class="card-box">
      <h3>庄园信息-小鸡</h3>
      <p><span class="card-label">等级:</span>{{chick.level}}</p>
      <p><span class="card-label">当前经验:</span>{{chick.exp}}</p>
      <p><span class="card-label">升级经验:</span>{{chick.upgradeExp}}</p>
      <p><span class="card-label">进食状态:</span><span v-if="chick.eat">进食中...</span><span v-if="!chick.eat">挨饿中...</span></p>
      <p><span class="card-label">总产蛋量:</span>{{chick.eggTotal}}</p>
      <p><span class="card-label">待拾蛋量:</span>{{chick.eggNum}}</p>
      <p><span class="card-label">鸡蛋进度:</span>{{chick.eggProgress}}%</p>
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
  computed: {
    ...mapGetters(["userinfo","chick"])
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog') // 取消和 x 按钮的事件，防止重复操作createDialog变量
    },
    signOutClose() {
      this.$emit('signOut')
    }
  }
}

</script>
