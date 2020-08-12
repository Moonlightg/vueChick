<template>
  <el-dialog
    title="购买商品"
    :visible.sync="purchaseDialog"
    width="80%"
    center
    :before-close="handleClose">
    <div class="shopping-box">
      <p class="good-title">{{currGood.name}}</p>
      <p>单价：${{currGood.price}}/个</p>
      <div class="num-form">
        <div class="shop-btn" @click="shopReduce"><i class="el-icon-remove-outline"></i></div>
        <div class="shop-input">
          <el-input v-model="shoppingNum" placeholder="数量"></el-input>
        </div>
        <div class="shop-btn" @click="shopAdd"><i class="el-icon-circle-plus-outline"></i></div>
      </div>
      <p>总价：${{currGood.price * shoppingNum}}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="closingGood">购买</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  props: {
    purchaseDialog: {
      type: Boolean
    },
    currGood: {
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
          message: "最少要购买一个",
          type: 'error'
        });
        return;
      }
      this.shoppingNum--;
    },
    shopAdd: function() {
      this.shoppingNum++;
    },
    closingGood: function() {
      if (this.shoppingNum == 0) {
        this.$message({
          message: "请输入购买数量",
          type: 'error'
        });
        return;
      } 
      if (this.currGood.type == 1) {
        if (this.userinfo.money < this.currGood.price * this.shoppingNum) {
          this.$message({
            message: "金币不足",
            type: 'error'
          });
        } else {
          this.reqClosingGood();
        }
      } else {
        if (this.userinfo.gem < this.currGood.price * this.shoppingNum){
          this.$message({
            message: "宝石不足",
            type: 'error'
          });
        } else {
          this.reqClosingGood();
        }
      }
    },
    reqClosingGood: function() {
      const obj = {
        name: this.currGood.name,   // 购买的商品名称
        type: this.currGood.type,   // 购买的商品类型
        price: this.currGood.price, // 购买的商品价格
        num: this.shoppingNum,      // 购买数量
      };
      this.$store.dispatch('reqClosingGood',obj);
      this.$store.dispatch("addLog", {log_type: 4,log_title: '购买了'+obj.name+'*'+obj.num});
      this.shoppingNum = 1;
      this.handleClose();
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
