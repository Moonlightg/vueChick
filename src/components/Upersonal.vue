<template>
  <el-dialog
    title="个人中心"
    :visible.sync="dialogStatus"
    width="80%"
    center
    :before-close="handleClose">
    <p>{{chick.openId}}</p>
    <p>{{chick.exp}}</p>
    <p>{{chick.upgradeExp}}</p>
    <p>{{chick.level}}</p>
    <p>{{chick.eat}}</p>
    <p>{{chick.eatTime}}</p>
    <p>{{chick.eatEndTime}}</p>
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
