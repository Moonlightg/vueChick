<template>
  <div class="main flex-column skin_b3" style="opacity: 1">
    <div class="box-head">
      <div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
      <h1>欢乐大抽奖</h1>
    </div>
    <div class="box-content">
      <p class="ld-title">可抽奖次数:{{count}}</p>
      <div class="wheel-main">
        <div class="wheel-pointer" @click="beginRotate()"></div>
        <div class="wheel-bg" :style="rotateStyle">
          <div class="prize-list">
            <div
              class="prize-item"
              v-for="(item,index) in prizeList"
              :key="index"
              :style="item.style"
            >
              <div class="prize-pic">
                <img :src="getImgUrl(item.img)" />
              </div>
              <div class="prize-type" v-if="item.type != 0">{{item.name}}*{{item.num}}</div>
              <div class="prize-type" v-if="item.type == 0">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
const CIRCLE_ANGLE = 360

const config = {
  // 总旋转时间
  duration: 4000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out'
}
export default {
  name: 'LuckDraw',
  data() {
    return {
      count:'',
      prizeList: [{
        img: "dj01.png", // 奖品图片
        name: "金币", // 奖品名称
        num: 500, // 奖励数值(数量)
        type: 1 // 奖品类型 (0谢谢参与,1奖励金币,2奖励宝石,3奖励物品)
      },
      {
        img: "food1.png",
        name: "小麦",
        num: 5,
        type: 3
      },
      {
        img: "dj01.png",
        name: "谢谢参与",
        num: 0,
        type: 0
      },
      {
        img: "food2.png",
        name: "三叶草",
        num: 2,
        type: 3
      },
      {
        img: "food3.png",
        name: "橄榄",
        num: 1,
        type: 3
      },
      {
        img: "dj01.png",
        name: "谢谢参与",
        num: 0,
        type: 0
      },
      {
        img: "dj01.png",
        name: "谢谢参与",
        num: 0,
        type: 0
      },
      {
        img: "dj01.png",
        name: "宝石",
        num: 100,
        type: 2
      }],
      duration: 3000, // 转盘旋转时间
      rotateAngle: 0, // 旋转角度
      index: 0,
      prize: null
    }
  },
  created() {
    this.angleList = []       // 初始化一些值
    this.isRotating = false   // 是否正在旋转
    this.config = config      // 基本配置
    this.initPrizeList();     // 获取奖品列表
  },
  computed: {
    ...mapGetters([
      "userinfo",
      "userFoodsList2"
    ]),
    rotateStyle () {
      return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
    }
  },
  mounted: function() {
    var _this = this;
    _this.$nextTick(function () {
      // 初始化可以抽奖的次数
      _this.initCount();
    })
  },
  methods: {
    initCount() {
      this.userFoodsList2.forEach(item => {
        if (item.name == '抽奖券') {
          this.count = item.num;
        }
      })
    },
    initPrizeList() {
      this.prizeList = this.formatPrizeList(this.prizeList)
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList (list) {
      // 记录每个奖的位置
      const angleList = []

      const l = list.length
      // 计算单个奖项所占的角度
      const average = CIRCLE_ANGLE / l

      const half = average / 2

      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {

        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -((i * average) + half)
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`

        // 记录每个奖项的角度范围
        angleList.push((i * average) + half )
      })

      this.angleList = angleList

      return list
    },
    beginRotate() {
      let luck = {
        name: '抽奖券',
        num: 1
      }
      if (this.count === 0) {
        this.$message({
          message: '没有多余的抽奖卷了',
          type: 'error'
        });
        return;
      }

      if (this.isRotating) {
        this.$message({
          message: '当前抽奖还没完成,请稍等会',
          type: 'error'
        });
        return;
      }
      // 开始抽奖
      // 这里这里向服务端发起请求，得到要获得的奖
      // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标

      // 随机获取下标
      this.index = this.random(this.prizeList.length - 1);
      console.log("获得的奖励");
      console.log(this.index);
      console.log(this.prizeList[this.index]);
      let reward = this.prizeList[this.index];
      if (reward.type == 0) {
        console.log("谢谢参与,没有中奖,不请求服务器");
        // 扣除抽奖券
        this.$store.dispatch('deductionFood',luck);
      } else {
        let obj = {
          name: reward.name,
          num: reward.num,
          type: reward.type
        }
        // 获取奖励
        this.$store.dispatch('reqLuckDraw',obj);

      }
      // 减少剩余抽奖次数
      this.count--
  
      // 开始旋转
      this.rotating()
    },
    random (max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    rotating() {
      const { isRotating, angleList, config, rotateAngle, index } = this

      if (isRotating) return

      this.isRotating = true
    
      // 计算角度
      const angle =
          // 初始角度
          rotateAngle +
          // 多旋转的圈数
          config.circle * CIRCLE_ANGLE +
          // 奖项的角度
          angleList[index] -
          (rotateAngle % CIRCLE_ANGLE)
        this.rotateAngle = angle

        // 旋转结束后，允许再次触发
        setTimeout(() => {
          this.rotateOver()
        }, config.duration + 1000)
    },
    rotateOver () {
      this.isRotating = false
      this.prize = this.prizeList[this.index]
      console.log(this.prize, this.index)
      if ( this.prize.type != 0 ) {
        this.$confirm('恭喜你,获得'+this.prize.name+'*'+this.prize.num, '抽奖结果', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'success',
          center: true
        }).then(() => {
          return
        })
      } else {
        this.$confirm('很遗憾,这次未中奖,下次女神会眷顾您!', '抽奖结果', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          center: true
        }).then(() => {
          return
        })
      }
      
    },
    getImgUrl(val){
      return require("@/assets/images/"+val);
    },
    returnIndex() {
      this.$router.push({
        path: '/index'
      });
    }
  }
}

</script>

<style type="text/css">
.ld-title {
  margin-bottom: 15px;
  color: #fff;
}
  .wheel-main {
    margin: 0 auto;
    position: relative;
    width: 295px;
    height: 295px;
  }
  .wheel-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url("../assets/images/draw_wheel.png") no-repeat center top;
    background-size: 100%;
    color: #fff;
  }
  .wheel-pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: 85px;
    height: 85px;
    background: url("../assets/images/draw_btn.png") no-repeat center top;
    background-size: 100%;
    transform: translate3d(-50%, -50%, 0);
  }
  .wheel-bg div {
    text-align: center;
  }
  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .prize-list .prize-item {
    position: absolute;
    width: 95px;
    height: 150px;
    top: 0;
    left: 50%;
    margin-left: -47.5px;
    transform-origin: 50% 100%;
  }

  .prize-pic img {
    width: 4.0625rem;
    height: 2.5rem;
    margin-top: 1.5625rem;
  }
  .prize-count {
    font-size: 0.875rem;
  }
  .prize-type {
    font-size: 0.75rem;
  }
</style>
