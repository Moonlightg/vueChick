<template>
  <div class="egg-wrapper" title="鸡蛋" ref="eggexp">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="egg infinite" @click="harvestEgg">
      <div class="heart">
        <div class="egg-num" v-if="eggnum != 0">{{eggnum}}</div>  
      </div>
    </div>
    <div class="egg-progress-wrap"> 
      <p>{{eggprogress}}%</p>
      <div class="egg-progress">
        <div class="egg-progress-item" :style="'width:' + eggprogress + '%' "></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'Egg',
  props: ['eggprogress','eggnum'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(["chick"])
  },
  methods: {
    // 弹出收成
    popAdd (addEggExps) {
      let self = this;
        let popDom = document.createElement('div');// 创建dom
        popDom.classList.add('pop-money');// 给dom添加class
        popDom.innerHTML = "+"+addEggExps;
        self.$refs.eggexp.appendChild(popDom);// 在ref="eggexp"元素内添加dom
        setTimeout(() => {
          popDom.remove()
        }, 500)
    },
    // 收取鸡蛋
    harvestEgg() {
      let self = this;
      let eggNum = self.chick.eggNum;
      let eggPrice = 1000; // 鸡蛋价格1000金币
      console.log("可收获的鸡蛋："+ eggNum);
      if (eggNum > 0) {
        var obj = {
          name: '精美鸡蛋',
          type: 2,
          num: eggNum,
          price: eggPrice,
          img: 'egg.png',
        }
        self.$store.dispatch('harvestegg',obj);
        self.popAdd(eggNum+"鸡蛋");
      }
    }
  }
}

</script>
