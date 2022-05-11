<template>
	<div class="main flex-column skin_b2">
		<div class="box-head">
			<div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
			<h1>抽卡</h1>
			<div class="user-money">
				<div class="user-mi c-blue"><i class="el-icon-trophy-1"></i></div>
				<p class="c-blue">{{userinfo.gem}}</p>
			</div>
		</div>
		<div class="box-content">
			<div class="gacha-tab">
				<div class="gacha-tab-item"
					 v-for="(item,index) in gachaList"
					 :class="{on:currentGacha == index}"
					 :key="item.gacha_id"
					@click="setTabIndex(index)">
					<p>{{item.gacha_name}}</p>
				</div>
			</div>
			<div class="gacha-tab-content">
				<div class="gacha-tab-content-item"
					 v-for="(item,index2) in gachaDetailList"
					 :class="{on:currentGacha == index2}"
					 :key="index2">
					<div v-html="setHtml(item.title)"></div>
					<div class="ga-label" v-html="item.date_range"></div>
					<div class="up-box" v-if="item.r5_up_items !== null">
						<div class="up-item" v-for="(item3,index3) in item.r5_up_items" :key="index3">
							<div class="up-img"><img :src="item3.item_img" alt=""></div>
							<div class="up-name">{{item3.item_name}}</div>
						</div>
					</div>
					<div class="end-time" v-if="gachaList[index2].gacha_name !== '常驻'">结束时间：{{gachaList[index2].end_time}}</div>
				</div>
			</div>
		</div>
		<div class="box-footer">
			<el-button type="warning" size="mini" @click="singleWish()">抽一次</el-button>
			<el-button type="warning" size="mini">抽十次</el-button>
		</div>
	</div>
</template>
<style type="text/css">
	.box-head .user-money {
		position: absolute;
		right: 20px;
	}
	.box-footer {

	}
	.gacha-tab {
		display: flex;
		justify-content: space-around;
		padding: 20px 30px 0;
	}

	.gacha-tab-item {
		margin: 10px 0;
		padding: 10px;
		background: #ececec;
		border: 1px solid #c9c9c9;
		border-radius: 5px;
		width: 80px;
	}

	.gacha-tab-item.on {
		background: #00b0ff;
		color: #fff;
		border-color: #0ca7eb;
	}

	.gacha-list-item p {
		text-align: left;
	}

	.gacha-tab-content-item {
		position: relative;
		display: none;
		background: #fffcf8;
		padding: 30px 20px;
		border-radius: 5px;
	}

	.gacha-tab-content-item.on {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.gacha-tab-content {
		padding: 0 20px;
	}
	.ga-label {
		position: absolute;
		top: 10px;
		right: 10px;
		background: #3f51b5;
		color: #fff;
		padding: 5px 10px;
		border-radius: 15px;
	}
	.up-box {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.up-item {
		display: flex;
		align-items: center;
		flex: 1;
		padding-top: 15px;
	}
	.up-img {
		margin-right: 15px;
	}
	.end-time {
		margin-top: 15px;
		color: #e6714c;
	}
</style>
<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'Gacha',
    data() {
      return {
        currentGacha: 0,
		currentGachaPool: {}, // 当前选择卡池信息
        AppCounter: {         // *** 抽卡计数
          total: null,		  // 总数
          ensureSSR: null,    // 是否大保底 0 | 1
          lastUpSSR: null,
          lastUpSR: null,
          lastSSR: null,
          lastSR: null,
          upSSR: [],
          upSR: [],
          ssr: [],
          sr: []
        },
        AppGachaItem: {   // *** 抽取结果
          name: '',       // 名称
          type: '',       // character:角色, weapon:武器
          rarity: null,   // 珍品数
          count: null     // 总数
        },
        AppGachaPool: {   			// *** 卡池数据
          name: '',
          type: '',      			// 'novice' | 'character' | 'weapon' | 'permanent'
          begin: '',
          end: '',
          upSSR: [],
          upSR: [],
          ssr: [],
          sr: [],
          r: []
        },
        _counter: {},
		_gachaPool: {},  //
		// _result: this.AppWishResult,
      }
    },
    computed: {
      ...mapGetters([
        "userinfo",
        "gachaList",
        "gachaDetailList"
      ])
    },
    components: {},
    mounted: function () {
      var _this = this;
      _this.$nextTick(function () {
        // 获取原神官网卡池信息
        _this.getOfficialGacha();
        _this.setOfficialGachaPool('200'); // 初始化当前卡池信息
      })
    },
    methods: {
      setHtml(o) {
        var html = '';
        for (var i = 0; i < o.length; i++) {
          var c = o.charAt(i);
          if (c.charCodeAt(0) >= 128) {
            html += o[i];
          }
        }
        return html;
      },
      setTabIndex(index) {
        this.currentGacha = index;
	  },
      /**
       * @method setGachaPool 配置卡池信息
       * @param {AppGachaPool} gachaPool 卡池信息
       */
      setGachaPool(gachaPool) {
        this._gachaPool = gachaPool;
        console.log("配置卡池信息");
        console.log(this._gachaPool);
	  },
      setOfficialGachaPool(type) {
        const poolData = this.gachaList.filter((i) => i.gacha_type === type);
        console.log(poolData);
		const pool = this.gachaDetailList.filter((i) => i.gacha_type === type);
        pool.begin_time = poolData[0].begin_time;
        pool.end_time = poolData[0].end_time;
        if (pool) {
          this.setGachaPool(this.poolStructureConverter(pool))
        } else {
          console.log('No such pool');
        }
	  },
      getOfficialGacha() {
        var _this = this;
        // 原神实时卡池信息
        // 请求的参数对象
        var paramsObj = {
          name: 'ysGacha'
        };
        _this.$store.dispatch('getYsGacha', paramsObj);
      },
      returnIndex() {
        this.$router.push({
          path: '/index'
        });
	  },
      poolStructureConverter (data) {
        var gachaType = {
          '200': 'permanent',
          '100': 'novice',
          '301': 'character',
          '302': 'weapon'
        };
        var itemType = {
          武器: 'weapon',
          角色: 'character'
        };
        var pool = {
          name: '',
          type: '',
          begin: '',
          end: '',
          upSSR: [],
          upSR: [],
          ssr: [],
          sr: [],
          r: []
        };
        pool.name = data.title.replace(/<\/?.+?>/g, '');
        pool.type = gachaType[data.gacha_type];
        pool.begin = data.begin_time;
        pool.end = data.end_time;
        // 5*
        data.r5_prob_list.forEach(function (item) {
          var name = item.item_name;
          var type = item.item_type;
          var gachaItem = { name: name, type: itemType[type], rarity: 5 };
          item.is_up === 1 ? pool.upSSR.push(gachaItem) : pool.ssr.push(gachaItem);
        });
        // 4*
        data.r4_prob_list.forEach(function (item) {
          var name = item.item_name;
          var type = item.item_type;
          var gachaItem = { name: name, type: itemType[type], rarity: 4 };
          item.is_up === 1 ? pool.upSR.push(gachaItem) : pool.sr.push(gachaItem);
        });
        // 3*
        data.r3_prob_list.forEach(function (item) {
          var name = item.item_name;
          var type = item.item_type;
          var gachaItem = { name: name, type: itemType[type], rarity: 3 };
          pool.r.push(gachaItem);
        });
        return pool;
      },
      /**
       * @method getCounter 获取指定计数器记录，若未指定则以键值对返回全部计数器记录
       * @param name
       * total {number} 总抽取数;
       * ensureSSR {0 | 1} 是否位于“大保底”状态;
       * lastUpSSR {number} 距离上一次 UP 5 星已过去多少抽;
       * lastUpSR {number} 距离上一次 UP 4 星已过去多少抽;
       * lastSSR {number} 距离上一次 5 星已过去多少抽;
       * lastSR {number} 距离上一次 4 星已过去多少抽;
       * upSSR {number[]} 每次获取 UP 5 星的间隔;
       * upSR {number[]} 每次获取 UP 4 星的间隔;
       * ssr {number[]} 每次获取 5 星的间隔;
       * sr {number[]} 每次获取 4 星的间隔;
       * @return {number | number[] | AppCounter}
       */
      getCounter(name) {
        var _a;
        return name ? ((_a = this._counter) === null || _a === void 0 ? void 0 : _a[name]) || 0 : this._counter;
      },
      setCounter(name, value) {
        this._counter = this._counter || {}
        if (typeof name === 'string' && typeof value !== 'undefined') {
          this._counter[name] = value
        } else if (typeof name === 'object') {
          this._counter = {
            ...this._counter,
            ...name
          }
        }
        return this;
      },
      increaseCounter(name, increase) {
		if (increase === void 0) { increase = 1; }
		var value = this.getCounter(name);
		if (typeof value === 'number') {
		  this.setCounter(name, value + increase);
		} else if (value.constructor.name.toLowerCase() === 'array') {
          this.setCounter(name, [...(value), increase])
		}
		console.log(this);
		return this;
	  },
      /**
       * @method singleWish 进行单次抽取并获取结果
       * @return {AppGachaItem} 抽取结果
       */
      singleWish() {
        this.increaseCounter('total');
	  }
    }
  }

</script>
