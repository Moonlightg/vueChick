<template>
  <el-dialog
    title="个人中心"
    :visible.sync="dialogStatus"
    width="80%"
    center
    :before-close="handleClose">
    <span>需要注意的是内容是默认不居中的</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="signOutClose">退出登录</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'Personal',
  props: {
    dialogStatus: {
      type: Boolean
    }
  },
  components: {
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
