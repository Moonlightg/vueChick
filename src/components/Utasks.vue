<template>
  <el-dialog
    title="每日任务"
    :visible.sync="taskDialog"
    width="80%"
    center
    :before-close="handleClose">
    <ul>
      <li v-for="task in tasks" :key="task.taskId" >
        <p>{{task.taskId}}</p>
        <p>{{task.taskTitle}}</p>
        <p>{{task.state}}</p>
      </li>
    </ul>
  </el-dialog>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  name: 'Tasks',
  props: {
    taskDialog: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["userinfo","tasks"])
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog') // 取消和 x 按钮的事件，防止重复操作createDialog变量
    }
  }
}

</script>
