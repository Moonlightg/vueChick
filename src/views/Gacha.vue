<template>
	<div class="main flex-column skin_b4">
		<div class="box-head flex-j-s">
			<div class="return-link" @click="returnIndex()"><i class="el-icon-arrow-left"></i>返回</div>
			<h1>祈愿</h1>
			<div class="u-m-bar">
				<div class="user-mi"><img :src="getImgUrl('gem.png')" alt=""></div>
				<p>{{userinfo.gem}}</p>
			</div>
		</div>
		<div class="box-content">
			<div class="gacha-tab">
				<div class="gacha-tab-item"
					 v-for="item in OfficialGachaType"
					 :class="{on:currentGacha == item.gacha_type}"
					 :key="item.gacha_type"
					@click="setTabIndex(item.gacha_type)">
					<p>{{item.gacha_name}}</p>
				</div>
			</div>
			<div class="gacha-tab-content">
				<div class="gacha-tab-content-item"
					 v-for="item in gachaDetailList"
					 :class="{on:currentGacha == item.gacha_type}"
					 :key="item.gacha_type">
					<div v-html="setHtml(item.title)"></div>
					<div class="ga-label" v-html="item.date_range"></div>
					<!--up卡池信息-->
					<div class="up-box" v-if="item.r5_up_items !== null">
						<!--up 五星-->
						<div class="up-r5">
							<div class="up-item" v-for="(item3,index3) in item.r5_up_items" :key="index3">
								<div class="up-img"><img :src="item3.item_img" alt=""></div>
								<div class="up-name">{{item3.item_name}}</div>
							</div>
						</div>
						<!--up 四星-->
						<div class="up-r4">
							<div class="up-item" v-for="item4 in item.r4_up_items" :key="item4.item_name">
								<div class="up-img"><img :src="item4.item_img" alt=""></div>
								<div class="up-name">{{item4.item_name}}</div>
							</div>
						</div>
					</div>
					<div class="end-time" v-if="item.gacha_type !== 200">结束时间：{{item.end_time}}</div>
				</div>
				<div class="kb-btn" @click="go('gachaPack')">我的卡包</div>
			</div>
		</div>
		<div class="box-footer gacha-btns">
			<div class="gacha-btn" @click="multiWish(1)">
				<p>祈愿一次</p>
				<div class="gacha-b-t">
					<div class="user-mi"><img :src="getImgUrl('gem.png')" alt=""></div>
					<p>160</p>
				</div>
			</div>
			<div class="gacha-btn" @click="multiWish(10)">
				<p>祈愿十次</p>
				<div class="gacha-b-t">
					<div class="user-mi"><img :src="getImgUrl('gem.png')" alt=""></div>
					<p>1600</p>
				</div>
			</div>
		</div>
		<!-- 抽卡结果界面 -->
		<div class="gacha-wrap" v-if="isWish">
			<div class="gacha-mask" @click="hideWish()"></div>
			<div class="gacha-list">
				<div class="gacha-item fadeInRight animated"
					 v-for="(item,index) in wishList"
					 :class="[item.rarity === 3 ? 'rarity-3' : '' , item.rarity === 4 ? 'rarity-4' : '' , item.rarity === 5 ? 'rarity-5' : '']"
					 :key="index">
					<div class="gacha-item-img">
						<img v-if="item.type === 'character'" :src="getImgUrl1(item.imgUrl)" alt="">
						<img v-if="item.type === 'weapon'" :src="getImgUrl2(item.imgUrl)" alt="">
					</div>
					<div class="gacha-item-name">{{item.name}}</div>
				</div>
				<i class="el-icon-circle-close gacha-close" @click="hideWish()"></i>
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
  import {getGacha} from '../plugins/http/api';
  import ajax from '../plugins/http/http';
  import storage from '../plugins/storage';
  import {ysImgs} from '../../utils/ys.js';
  export default {
    name: 'Gacha',
    data() {
      return {
        isDisabled: false,
        isWish: false,
        currentGacha: 301,
		currentGachaPool: {}, // 当前选择卡池信息
        OfficialGachaType: [  // 卡池类型信息
		  {
            gacha_type: 301,
            gacha_name: '角色'
          }, {
            gacha_type: 302,
            gacha_name: '武器'
          },{
            gacha_type: 200,
            gacha_name: '常驻'
          }
        ],
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
        SpecialRoll: {
          lastCount: null,
          baseChance: null,
          upChance: null,
          softEnsure: null,
          turningPoint: null,
          hardEnsure: false
        },
        _counter: {},  // 用户抽卡计数统计
		_gachaPool: {},
        result: { // 抽卡卡片数据
          ssr: [],
          sr: [],
          r: []
        },
		ysImgs: ysImgs(),// 原神图片资源
        wishList:[]      // 抽卡完成后的数据
      }
    },
    computed: {
      ...mapGetters([
        "userinfo",
        "gachaList",
        "gachaDetailList",
		"gachaCounter",
		"gachaResult",
      ])
    },
    components: {},
    created: function () {
      // 获取卡池缓存，不用每次都请求（测试用）
	     this.getStoreData();
      // 获取原神官网卡池信息
      // this.getOfficialGacha();
	  // 获取该用户的抽卡统计数据
	  this.getUserGacha();
	},
    mounted: function () {
      var _this = this;
      _this.$nextTick(function () {
        // console.log(_this._counter);
        // console.log(_this._gachaPool);
        // _this.setOfficialGachaPool(200); // 初始化当前卡池信息
      })
    },
    methods: {
      getUserGacha() {
        this.$store.dispatch('getUserGacha');
	  },
      getStoreData() {
		var gachaList = storage.get('gachaListData');
		var gachaDetailList = storage.get('gachaDetailListData');
        console.log('缓存里面的卡池列表与卡池列表详情信息：');
        console.log(gachaList);
        console.log(gachaDetailList);
		if (gachaList === null && gachaDetailList === null) {
          console.log('没有卡池信息缓存');
          this.getOfficialGacha();
          this.setOfficialGachaPool(301);
		} else {
          // this.$store.dispatch('setYsGacha', gachaList);
          // this.$store.dispatch('setYsGachaList', gachaDetailList);
          console.log('有卡池缓存');
          console.log(this.gachaList);
          console.log(this.gachaDetailList);
          console.log(this.ysImgs);
          // 设置初始卡池
          this.setOfficialGachaPool(301);
		}
	  },
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
      setTabIndex(type) {
        this.setOfficialGachaPool(type);
        this.currentGacha = type;
	  },
      /**
       * @method setGachaPool 配置卡池信息
       * @param {AppGachaPool} gachaPool 卡池信息
       */
      setGachaPool(gachaPool) {
        this._gachaPool = gachaPool;
        console.log("配置指定卡池信息");
        console.log(this._gachaPool);
	  },
      setOfficialGachaPool(type) {
        console.log('当前要设定的卡池类型：'+type);
        const poolData = this.gachaList.filter((i) => i.gacha_type === type);
		const pool = this.gachaDetailList.filter((i) => i.gacha_type === type);
        // pool.begin_time = poolData[0].begin_time;
        // pool.end_time = poolData[0].end_time;
		console.log(pool);
        if (pool[0]) {
          this.setGachaPool(this.poolStructureConverter(pool[0]))
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
	  // 卡池数据转换器
      poolStructureConverter (data) {
        console.log("获得卡池数据");
        console.log(data);
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
        // pool.name = data.title.replace(/<\/?.+?>/g, '');
        pool.name = data.title;
        pool.type = gachaType[data.gacha_type];
        pool.begin = data.begin_time;
        pool.end = data.end_time;
        // 5*
        data.r5_prob_list.forEach(item => {
          var name = item.item_name;
          var type = item.item_type;
          var gachaItem = { name: name, type: itemType[type], rarity: 5 };
          item.is_up === 1 ? pool.upSSR.push(gachaItem) : pool.ssr.push(gachaItem);
		});
        // 4*
        data.r4_prob_list.forEach(item => {
          var name = item.item_name;
          var type = item.item_type;
          var gachaItem = { name: name, type: itemType[type], rarity: 4 };
          item.is_up === 1 ? pool.upSR.push(gachaItem) : pool.sr.push(gachaItem);
        });
        // 3*
        data.r3_prob_list.forEach(item => {
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
        var counter = name ? ((_a = this._counter) === null || _a === void 0 ? void 0 : _a[name]) || 0 : this._counter
        return counter;
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
      /**
       *
       * @param type
       * @returns
       */
      // 获取抽卡结果
      getResult(type) {
        var _a;
        return type ? ((_a = this.result) === null || _a === void 0 ? void 0 : _a[type]) || [] : this.result;
      },
	  // 设置抽卡结果
      setResult(type, value) {
        // console.log('抽到的卡类型：'+type);
        // console.log('抽到的卡信息：');
        // console.log(value);
        if (typeof type === 'string' && typeof value !== 'undefined') {
          this.$set(this.result,type,value);
          // this.result == 抽卡后整体数据
        } else {
          this.result = type;
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
        console.log("初始化抽卡数：");
        console.log(this._counter);
		return this;
	  },
      increaseResult(type, item) {
        // item为当前抽中的卡
        var oldResult = this.getResult(type);
        // console.log('获取'+type+'类型的抽卡前的数据');
        // 获取'+type+'类型的抽卡前的数据
        // console.log(oldResult);
        var sameItem = oldResult.filter(function (i) { return i.name === item.name; });
        if (sameItem.length < 1) {
          item.count = 1;
          this.setResult(type, [...oldResult, item]);
        }
        else {
          sameItem[0].count && sameItem[0].count++;
        }
        console.log('抽卡后整体数据：');
        console.log(this.result);
        return this;
      },
      randomNum() {
		return Math.random();
	  },
      randomPick(list) {
		return list[Math.floor(Math.random() * list.length)];
	  },
      /**
       * @function specialRoll
       * @param {number} count
       * @return {0|1|2} 分别代表失败、抽中、抽中 UP
       */
      _generateRoll(_a) {
        var lastCount = _a.lastCount,
			baseChance = _a.baseChance,
			upChance = _a.upChance,
			softEnsure = _a.softEnsure,
			turningPoint = _a.turningPoint,
			hardEnsure = _a.hardEnsure;
        var chance = 0;
        var more = (1 - baseChance) / (softEnsure - turningPoint);
        if (lastCount <= turningPoint) {
          chance = baseChance;
        }
        else {
          chance = baseChance + more * (lastCount - turningPoint);
        }
        if (chance >= this.randomNum()) {
          if (this.randomNum() >= upChance || hardEnsure) {
            return 2;
          }
          return 1;
        }
        return 0;
      },
	  rollSSR(ensure) {
		this.increaseCounter('lastSSR');
		this.increaseCounter('lastUpSSR');
		var count = this.getCounter('lastSSR');
		var upCount = this.getCounter('lastUpSSR');
		var result = this._generateRoll({
		  lastCount: count,
		  baseChance: 0.006,
		  upChance: 0.5,
		  softEnsure: 90,
		  turningPoint: 72,
		  hardEnsure: ensure
		});
		if (result === 1) {
		  this.setCounter('ensureSSR', 1);
		}
		if (result === 2) {
		  this.setCounter('ensureSSR', 0);
		  this.increaseCounter('upSSR', upCount);
		  this.setCounter('lastUpSSR', 0);
		}
		if (result > 0) {
		  this.increaseCounter('ssr', count);
		  this.setCounter('lastSSR', 0);
		}
		return result;
	  },
	  rollSR() {
		this.increaseCounter('lastSR');
		this.increaseCounter('lastUpSR');
		var result = this._generateRoll({
		  lastCount: this.getCounter('lastSR'),
		  baseChance: 0.051,
		  upChance: 0.5,
		  softEnsure: 10,
		  hardEnsure: false,
		  turningPoint: 7
		});
		if (result === 2) {
		  this.increaseCounter('upSR', this.getCounter('lastUpSR'));
		  this.setCounter('lastUpSR', 0);
		}
		if (result > 0) {
		  this.increaseCounter('sr', this.getCounter('lastSR'));
		  this.setCounter('lastSR', 0);
		}
		return result;
	  },
      /**
       * @method singleWish 进行单次抽取并获取结果
       * @return {AppGachaItem} 抽取结果
       */
      singleWish() {
        var _this = this;
        // 添加抽卡计数====开始
        _this.increaseCounter('total');
        var getSSR = function (isUP) {
          if (_this._gachaPool.upSSR.length < 1) {
            _this._gachaPool.upSSR = _this._gachaPool.ssr;
          }
          var character = _this.randomPick(isUP ? _this._gachaPool.upSSR : _this._gachaPool.ssr);
          character.rarity = 5;
          _this.increaseResult('ssr', character);
          console.log('getSSR:===================5星==抽到了，⭐️⭐️⭐️⭐️⭐ '+ character.name + '️=====================================');
          return character;
        };
        var getSR = function (isUP) {
          if (_this._gachaPool.upSR.length < 1) {
            _this._gachaPool.upSR = _this._gachaPool.sr;
          }
          var character = _this.randomPick(isUP ? _this._gachaPool.upSR : _this._gachaPool.sr);
          character.rarity = 4;
          _this.increaseResult('sr', character);
          console.log('getSR:====================4星==抽到了，⭐️⭐️⭐️⭐ '+ character.name + '️====================================');
          return character;
        };
        var getR = function () {
          var character = _this.randomPick(_this._gachaPool.r);
          character.rarity = 3;
          _this.increaseResult('r', character);
          console.log('getR:==========================抽到了，⭐️⭐️⭐️ '+ character.name + '==================================');
          return character;
        };
        var isSSR = _this.rollSSR(Boolean(_this.getCounter('ensureSSR')));
        if (isSSR > 0) {
          return getSSR(isSSR === 2);
        } else {
          var isSR = _this.rollSR();
          if (isSR > 0) {
            return getSR(isSR === 2);
          }
          else {
            return getR();
          }
        }
	  },
      /**
       * @method multiWish 进行多次抽取并获取结果集合
       * @param count 抽取的次数
       * @return {AppGachaItem[]} 结果集合
       */
      multiWish(count) {
        let price = count * 160;
        if (price > this.userinfo.gem ) {
          this.$message({
            message: '原石不足，联系鸡哥（QQ:1079832313），给你送6480',
            type: 'error'
          });
          return;
        }
        this._counter = this.gachaCounter;
        this.result = this.gachaResult;
        const result = [];
        this.wishList = [];
        for (let i = 0; i < count; i++) {
          result.push(this.singleWish())
        }
        // 保存抽卡记录 抽卡完成后要匹配图片库中的图片
        this.saveCounter(count);
        // 保存抽卡卡片信息数组
        // this.saveResult();
		this.saveWish(result);
      },
	  saveWish(list) {
        var _this = this;
		list.forEach(item =>{
		  if(item.type === 'weapon'){
		    _this.ysImgs[1].list.forEach(item2 => {
		      if(item2.name === item.name) {
		        item.imgUrl = item2.imgUrl;
				_this.wishList.push(item);
			  }
			})
		  } else {
            _this.ysImgs[0].list.forEach(item2 => {
              if(item2.name === item.name) {
                item.imgUrl = item2.imgUrl;
                _this.wishList.push(item);
              }
            })
		  }
		});
		if (list.length === _this.wishList.length) {
		  _this.isWish = true;
          console.log( _this.wishList);
		}
	  },
      hideWish() {
        this.isWish = false;
	  },
      getImgUrl(val){
        return require("@/assets/images/"+val);
      },
      getImgUrl1(val){
        return require("@/assets/images/ys/character/"+val+'.png');
      },
      getImgUrl2(val){
        return require("@/assets/images/ys/weapon/"+val+'.png');
      },
	  // 保存抽卡数到后台
	  saveCounter(count) {
        var obj = {};
        obj.countNum = count;
	    obj.counter = this._counter;
	    obj.result = this.result;
        // var obj = this._counter;
        console.log('查看抽卡保存传递数据');
        console.log(obj);
        this.$store.dispatch('saveUserGacha', obj);
	  },
      // 保存抽卡卡片数组到后台
      saveResult() {
        var obj = this.result;
        this.$store.dispatch('saveUserGacha', obj);
	  },
      go(url) {
        this.$router.push({
          path: '/'+url
        });
	  }
    }
  }

</script>
