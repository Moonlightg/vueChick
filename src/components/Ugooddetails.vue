<template>
  <el-dialog
    title="详情"
    :visible.sync="goodDialog"
    width="80%"
    center
    :before-close="handleClose">
    <div class="shopping-box">
      <div class="food-img">
        <img :src="getImgUrl(currFood.img)">
      </div>
      <p class="good-title">{{currFood.name}}</p>
      <P>增加经验:{{currFood.exp}}</P>
      <P>进食时长:{{currFood.eatTime | SecondToDate }}</P>
      <P>库存拥有:{{currFood.num}}</P>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="feeding">喂食</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  props: {
    goodDialog: {
      type: Boolean
    },
    currFood: {
      type: Object
    },
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(["chick"])
  },
  methods: {
    getImgUrl(val){
      console.log(val);
      return require("@/assets/images/"+val);
    },
    handleClose() {
      this.$emit('closeDialog')
    },
    feeding() {
      // 判断是否在进食
      if (this.chick.eat) {
        this.$message({
          message: '我还在吃着呢!',
          type: 'error'
        });
        return
      } else if (this.currFood.num > 0) {
        let startDate = new Date().getTime();
        let eatEndTime = startDate + this.currFood.eatTime;
        this.currFood.num-- ;
        var obj = this.currFood;
        obj.eatEndTime = eatEndTime;
        console.log(obj);
        this.$store.dispatch('reqFeeding',obj);
        this.$emit('countdown',startDate, eatEndTime);
      } else {
        this.$message({
          message: "你没有"+this.currFood.name+"食物了",
          type: 'error'
        });
      }
    }
  }
}

</script>
<style>
  .shopping-box p {
    padding: 5px 0;
  }
  .good-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
  }
</style>
