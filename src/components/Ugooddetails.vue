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
      <div v-if="currFood.type == 1">
        <P>增加经验:{{currFood.exp}}</P>
        <P>进食时长:{{currFood.eatTime | SecondToDate }}</P>
      </div>
      <div v-if="currFood.type == 2">
        <P>物品单价:{{currFood.price}}金币</P>
      </div>
      <div v-if="currFood.type == 3">
        <P>物品单价:{{currFood.price}}宝石</P>
      </div>
      <P>库存拥有:{{currFood.num}}</P>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="feeding" v-if="currFood.type == 1">喂食</el-button>
      <el-button type="success" @click="use" v-if="currFood.type == 3">使用</el-button>
      <el-button type="danger" @click="sell" v-if="currFood.type == 2 || currFood.type == 3">出售</el-button>
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
    ...mapGetters([
        "chick",
        "userFoodsList"
      ])
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
        if ( this.currFood.num == 0) {
          this.userFoodsList.forEach((item,index) => {
            if(item.name === this.currFood.name) {
              this.userFoodsList.splice(index,1);
            }
          })
        }
        var obj = this.currFood;
        obj.eatEndTime = eatEndTime;
        this.$store.dispatch('reqFeeding',obj);
        this.$store.dispatch("addLog", {log_type: 6,log_title: '投喂了'+this.currFood.name+'*1'});
        this.$emit('countdown',startDate, eatEndTime);
        this.$emit('closeDialog');
      } else {
        this.$message({
          message: "你没有"+this.currFood.name+"食物了",
          type: 'error'
        });
      }
    },
    sell() {
      //this.$store.dispatch('sellGood',this.currFood.name);
      console.log("出售:"+this.currFood.name);
      this.$emit('showSell')
    },
    use() {
      this.$emit('use',this.currFood.name);
      // console.log(this.currFood);
      // switch(this.currFood.name) {
      //   case '抽奖券':
      //     console.log("当前是抽奖卷");
      //     break;
      //   case '1小时加速卡':
      //     console.log("当前是1小时加速卡");

      //     break;
      //   default:
      //     console.log(this.currFood.name);
      // } 
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
