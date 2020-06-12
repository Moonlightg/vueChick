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
          <el-input v-model="shoppingNum" placeholder="数量"></el-input>
        </div>
        <div class="shop-btn" @click="shopAdd"><i class="el-icon-circle-plus-outline"></i></div>
      </div>
      <p>出售总价：<i class="el-icon-s-help"></i>{{currFood.price * shoppingNum}}</p>
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
      shoppingNum: 1
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
      if (this.shoppingNum === 1) {
        this.$message({
          message: "不能出售少于0个",
          type: 'error'
        });
        return;
      }
      this.shoppingNum--;
    },
    shopAdd: function() {
      if ( this.shoppingNum < this.currFood.num) {
        this.shoppingNum++;
      } else {
        this.$message({
          message: "没有更多了",
          type: 'error'
        });
        return;
      }
    },
    gosell: function() {
      if (this.shoppingNum == 0) {
        this.$message({
          message: "请输入购买数量",
          type: 'error'
        });
      } else if (this.userinfo.money < this.currGood.price * this.shoppingNum) {
        this.$message({
          message: "金币不足",
          type: 'error'
        });
      } else {
        const obj = {
          goodName: this.currGood.name, // 购买商品名称
          goodNum: this.shoppingNum, // 购买数量
          money: this.userinfo.money - this.currGood.price * this.shoppingNum // 购买后金额计算
        };
        this.$store.dispatch('reqClosingGood',obj);
        this.$store.dispatch("addLog", {log_title: '购买了'+obj.goodName+'*'+obj.goodNum});
        this.shoppingNum = 1;
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
