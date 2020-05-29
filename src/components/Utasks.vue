<template>
  <el-dialog
    title="每日任务"
    :visible.sync="taskDialog"
    width="80%"
    center
    :before-close="handleClose">
    <ul class="tasks-list">
      <li v-for="task in tasks.tasks" :key="task.taskId" >
<!--         <p>{{task.taskId}}</p> -->
        <div class="task-item">
          <div class="task-l">
            <p>{{task.taskTitle}}</p>
            <div class="reward-t">
              <p>奖励<i class="el-icon-s-help"></i><span>{{task.rewardMoney}}</span></p>
              <p v-if="task.rewardGem != 0"><i class="el-icon-trophy-1"></i><span>{{task.rewardGem}}</span></p></div>
          </div>
          <div class="task-c">
            {{task.currCount}}/{{task.needCount}}
          </div>
          <div class="task-r">
            <p v-if="task.state === 0">未完成</p>
            <p v-if="task.state === 1"><el-button type="primary" round @click="receiveTask(task.taskId)">领取奖励</el-button></p>
            <p v-if="task.state === 2"><el-button type="info" round disabled>已领取</el-button></p>
          </div>
        </div>
        
        
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
    },
    receiveTask(val) {
      this.$store.dispatch('receiveTask',val);
    }
  }
}

</script>
<style type="text/css">
  .tasks-list li{
    border: 1px solid #cab2a9;
    padding: 10px;
    background: #fffcf8;
    border-radius: 3px;
  }
  .tasks-list li + li {
    margin-top: 10px;
  }
  .task-item {
    display: flex;
  }
  .task-l {
    flex: 1;
  }
  .task-c {
    padding-right: 10px;
    flex: 0 0 40px;
    text-align: right;
  }
  .task-r {
    flex: 0 0 60px;
    text-align: right;
  }
  .reward-t {
    display: flex;
    margin-top: 5px;
  }
  .reward-t p i{
    margin-left: 10px;
  }
</style>
