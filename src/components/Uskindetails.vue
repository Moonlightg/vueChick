<template>
  <el-dialog
    title="皮肤详情"
    :visible.sync="skinDialog"
    width="80%"
    center
    :before-close="handleClose">
    <div class="shopping-box">
      <div class="food-img">
        <img :src="getImgUrl(currSkin.img)">
      </div>
      <p>{{currSkin.skinName}}</p>
      <p>所属分类:
        <span v-if="currSkin.skinId == 1">套装</span>
        <span v-if="currSkin.skinId == 2">帽子</span>
        <span v-if="currSkin.skinId == 3">上衣</span>
      </p>
      <p>所属类型:{{currSkin.skinType}}</p>
      <p>皮肤状态:
        <span v-if="currSkin.skinState == 0">未激活</span>
        <span v-if="currSkin.skinState == 1">已激活</span>
        <span v-if="currSkin.skinState == 2">使用中</span>
      </p>
      <p>激活价格:
        7天:{{currSkin.price}};30天:{{currSkin.price*3}};</p>

      <p>激活时间:{{currSkin.start_date}}</p>
      <p>到期时间:{{currSkin.end_date}}</p>
      <p>有效期剩:{{currSkin.diff}}</p>
      
    </div>
    <span slot="footer" class="dialog-footer">
      <div v-if="currSkin.skinState == 0 && currSkin.skinId == 1" >
        <el-button type="danger" @click="buy(currSkin.skinType,7,currSkin.price,currSkin.skinName)">购买7天</el-button>
        <el-button type="danger" @click="buy(currSkin.skinType,30,currSkin.price*3,currSkin.skinName)">购买30天</el-button>
      </div>
      <el-button type="success" v-if="currSkin.skinState == 1">使用</el-button>
      <el-button type="danger" v-if="currSkin.skinState == 2">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  props: {
    skinDialog: {
      type: Boolean
    },
    currSkin: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      "userinfo"
    ])
  },
  mounted: function() {
  },
  methods: {
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    handleClose() {
      this.$emit('closeDialog')
    },
    // 激活皮肤, 皮肤只能使用 "宝石" 购买
    buy(skinType,days,price,skinName) {
      let _this = this;
      let html = "购买"+days+"天需要,宝石"+price;
      _this.$confirm(html, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (price > _this.userinfo.gem ) {
          _this.$message({
            message: '您的宝石不足!',
            type: 'error'
          });
        } else {
          // 购买皮肤
          var obj = {
            skinType: skinType,
            days: days,
            price: price
          }
          _this.$store.dispatch('reqBuySkin',obj);
          _this.$store.dispatch("addLog", {log_title: '购买了'+days+'天'+skinName});
        }
      }).catch(() => {
        console.log("取消购买");         
      });
    }
  }
}

</script>
<style>
  .shopping-box p {
    padding: 5px 0;
  }
</style>
