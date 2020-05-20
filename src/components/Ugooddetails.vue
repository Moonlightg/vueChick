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
      <el-button type="danger">喂食</el-button>
    </span>
  </el-dialog>
</template>

<script>

//import {mapGetters} from "vuex";
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
    //...mapGetters(["userinfo"])
  },
  methods: {
    getImgUrl(val){
      console.log(val);
      return require("@/assets/images/"+val);
    },
    handleClose() {
      this.$emit('closeDialog') // 取消和 x 按钮的事件，防止重复操作createDialog变量
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
