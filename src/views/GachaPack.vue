<template>
	<div class="main flex-column skin_b4">
		<div class="box-head flex-j-s">
			<div class="return-link" @click="go('gacha')"><i class="el-icon-arrow-left"></i>返回</div>
			<h1>我的卡包</h1>
		</div>
		<div class="pack-box">
			<div class="gacha-tab">
				<div class="gacha-tab-item"
					 v-for="item in resultType"
					 :class="{on:currentResult == item.type}"
					 :key="item.type"
					@click="setTabIndex(item.type)">
					<p>{{item.name}}</p>
				</div>
			</div>
			<div class="pack-content">
				<div class="pack-content-item"
					 v-for="(key,val,i) in gachaResult"
					 :class="{on:currentResult == val}" :data-key="val" :data-i="i">
					<div class="gacha-pack-list">
						<div class="gacha-pack-item fadeInRight animated"
							 v-for="(item,index) in key"
							 :class="[item.rarity === 3 ? 'rarity-3' : '' , item.rarity === 4 ? 'rarity-4' : '' , item.rarity === 5 ? 'rarity-5' : '']"
							 :key="index">
							<div class="gacha-item-img">
								<span class="count">{{item.count}}</span>
								<img v-if="item.type === 'character'" :src="getImgUrl1(item.imgUrl)" alt="">
								<img v-if="item.type === 'weapon'" :src="getImgUrl2(item.imgUrl)" alt="">
							</div>
							<div class="gacha-item-name">{{item.name}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<style type="text/css">
	.box-head .user-money {
		position: absolute;
		right: 20px;
	}
	.box-footer {
		padding: 20px 0;
	}
</style>
<script>
  import {mapGetters} from "vuex";
  import {ysImgs} from '../../utils/ys.js';
  export default {
    name: 'Gacha',
    data() {
      return {
        currentResult: 'ssr',
        resultType: [
		  {
            type: 'ssr',
            name: '五星'
          }, {
            type: 'sr',
            name: '四星'
          },{
            type: 'r',
            name: '三星'
          }
        ],
		ysImgs: ysImgs(),// 原神图片资源
      }
    },
    computed: {
      ...mapGetters([
        "gachaResult"
      ])
    },
    components: {},
    created: function () {
      console.log(this.gachaResult)
	},
    mounted: function () {
      var _this = this;
      _this.$nextTick(function () {
      })
    },
    methods: {
      setTabIndex(type) {
        this.currentResult = type;
	  },
      getImgUrl1(val){
        return require("@/assets/images/ys/character/"+val+'.png');
      },
      getImgUrl2(val){
        return require("@/assets/images/ys/weapon/"+val+'.png');
      },
      go(url) {
        this.$router.push({
          path: '/'+url
        });
      }
    }
  }

</script>
