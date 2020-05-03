<template>
  <div class="container">
    <div class="user-box">
      <div class="user-logo">
        <div class="user-level">{{userinfo.level}}</div>
        <span class="portrait-item portrait0"></span>
      </div>
      <div class="user-info">
        <div class="user-name">{{userinfo.username}}</div>
        <div class="user-money">
          <div class="user-mi"><i class="el-icon-s-help"></i></div>
          <p>{{userinfo.money}}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="hello" style="position: fixed;z-index: 9999; right: 0;">
        <el-button type="danger" @click="loginOut">退出登录</el-button>
      </div>
      <!-- 太阳光 -->
      <Csunlight></Csunlight>
      <!-- 山峰 -->
      <Cpeak></Cpeak>
      <!-- 白云 -->
      <Cclouds></Cclouds>
      <div class="land-wrap">
          <!-- 草地 -->
          <Cgrass></Cgrass>
          <!-- 房子 -->
          <Chouse></Chouse>
          <!-- 护栏 -->
          <Cfence></Cfence>
          <!-- 蜜蜂鲜花 -->
          <Cbee></Cbee>
        </div>
    </div>
    <!-- 叶子 -->
    <Cleaf></Cleaf>
    <!-- 鸡饭碗 -->
    <Ctrough></Ctrough>
  </div>
</template>

<script>
// 场景组件
import Csunlight from '../components/Csunlight.vue' // 太阳光
import Cpeak from '../components/Cpeak.vue'         // 山峰
import Cclouds from '../components/Cclouds.vue'     // 白云
import Cgrass from '../components/Cgrass.vue'       // 草地
import Chouse from '../components/Chouse.vue'       // 房子
import Cfence from '../components/Cfence.vue'       // 护栏
import Cbee from '../components/Cbee.vue'           // 蜜蜂鲜花
import Cleaf from '../components/Cleaf.vue'         // 叶子
import Ctrough from '../components/Ctrough.vue'     // 鸡饭碗
import {mapGetters} from "vuex";
export default {
  name: 'Index',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  components: {
    Csunlight,
    Cpeak,
    Cclouds,
    Cgrass,
    Chouse,
    Cfence,
    Cbee,
    Cleaf,
    Ctrough
  },
  mounted: function() {
  //这个是钩子函数
  //如果cartView函数要执行，必须先执行钩子函数
  //这个钩子函数完成了对cratView函数的调用
  //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入Vue.nextTick/vm.$nextTick
    this.$nextTick(function () {
      this.getUser();
    })
  },
  methods: {
    // 获取用户信息
    getUser() {
      //this.user.username = "test";
      // this.$ajax.get('/api/users/info').then((res) => {
      //   console.log(res);
      // });
      var aaa = this.userinfo;
      console.log(aaa);
    },
    // 退出登录
    loginOut() {
      // 清除用户数据
      this.$store.commit("loginOut");
      // 退出登录跳转到登录界面
      this.$router.push({
        path: '/login'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
