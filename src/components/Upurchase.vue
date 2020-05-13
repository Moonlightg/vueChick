<template>
  <el-dialog
    title="购买商品"
    :visible.sync="purchaseDialog"
    width="80%"
    center
    :before-close="handleClose">
    <div class="shopping-box">
      <p>{{currGood.name}}</p>
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
      <el-button type="danger">购买</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    purchaseDialog: {
      type: Boolean
    },
    currGood: {
      type: Object
    },
  },
  data () {
    return {
      shoppingNum: 0
    }
  },
  components: {
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog') // 取消和 x 按钮的事件，防止重复操作createDialog变量
    },
    shopReduce: function() {
      this.shoppingNum--;
    },
    shopAdd: function() {
      this.shoppingNum++;
    }
  }
}

</script>
