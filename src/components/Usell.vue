<template>
  <el-dialog
    title="出售物品"
    :visible.sync="sellDialog"
    width="80%"
    center
    :before-close="handleClose">
    <div class="shopping-box">
      <p class="good-title">{{currFood.name}}</p>
      <P>库存拥有:{{currFood.num}}</P>
      <p>价值：<i class="el-icon-s-help"></i>{{currFood.price}}/个</p>
      <div class="num-form">
        <div class="shop-btn" @click="shopReduce"><i class="el-icon-remove-outline"></i></div>
        <div class="shop-input">
          <el-input v-model="foodNum" placeholder="数量"></el-input>
        </div>
        <div class="shop-btn" @click="shopAdd"><i class="el-icon-circle-plus-outline"></i></div>
      </div>
      <p>出售总价：<i class="el-icon-s-help"></i>{{currFood.price * foodNum}}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="gosell">出售</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  props: {
    sellDialog: {
      type: Boolean
    },
    currFood: {
      type: Object
    }
  },
  data () {
    return {
      foodNum: 1,
      tit: ''
    }
  },
  computed: {
    ...mapGetters(["userinfo","goodsList"])
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog') // 取消和 x 按钮的事件，防止重复操作createDialog变量
    },
    shopReduce: function() {
      if (this.foodNum === 1) {
        this.$message({
          message: "不能出售少于0个",
          type: 'error'
        });
        return;
      }
      this.foodNum--;
    },
    shopAdd: function() {
      if ( this.foodNum < this.currFood.num) {
        this.foodNum++;
      } else {
        this.$message({
          message: "没有更多了",
          type: 'error'
        });
        return;
      }
    },
    gosell: function() {
      if (this.foodNum == 0) {
        this.$message({
          message: "请输入出售数量",
          type: 'error'
        });
      } else {
        if (this.currFood.type == 1) {
          this.tit = "获得金币"
        } else {
          this.tit = "获得宝石"
        }
        const obj = {
          // name: this.currFood.name, // 出售物品名称
          // num: this.foodNum, // 出售数量数量
          // money: this.currFood.price * this.foodNum, // 出售后金额计算
          // moneyType: 2 // 金钱类型

          name: this.currFood.name,   // 出售物品的名称
          type: this.currFood.type,   // 出售物品的类型
          price: this.currFood.price, // 出售物品的价格
          num: this.foodNum,      // 出售数量
        };
        this.$store.dispatch('reqSellFood',obj);
        this.$store.dispatch("addLog", {log_title: '出售了'+obj.name+'*'+obj.num+","+this.tit+":"+obj.price * obj.num});
        this.handleClose();
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
