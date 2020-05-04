<template>
  <div class="main login-box"
    v-loading="loading"
    element-loading-text="登录中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="login-head">
      <Cbee></Cbee>
      <p>VueChick</p>
    </div>
    <div class="login-form">
      <div style="margin: 20px 0;"></div>
      <el-input v-model="user.username" placeholder="userName"></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input v-model="user.pass" placeholder="Pass" show-password></el-input>
      <div style="margin: 20px 0;"></div>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button type="text" @click="goRegister">没有账号,前往注册</el-button>
    </div>
  </div>
</template>

<script>
import Cbee from '../components/Cbee.vue'           // 蜜蜂鲜花
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        pass: ''
      },
      loading: false
    }
  },
  components: {
    Cbee
  },
  methods: {
    submitForm () {
      if (!this.user.username) {
        this.$message({
          message: '用户名不能为空',
          type: 'error'
        });
        return;
      }
      if (!this.user.pass) {
        this.$message({
          message: '密码不能为空',
          type: 'error'
        });
        return;
      }
      const obj = {
        username: this.user.username,
        pass: this.user.pass
      };
      this.$ajax.post('/api/login', obj).then((res) => {
        console.log('---------res-------');
        console.log(res);
        if (res.data.code === 0) {
          // 登录成功
          // 保存token
          this.$store.commit("set_token", res.data.token);
          // 保存用户
          this.$store.commit("set_userInfo", res.data.data);
          // 保存登录状态
          this.$store.commit("isLogin", true);
          this.loading = true;
          // 跳转路由
          setTimeout(() => {
            this.$router.push({
              path: '/index'
            });
          }, 2000);
        } else {
          // 登录失败
          this.$message({
            message: res.data.message,
            type: 'error'
          });
          console.log(res.data.message)
        }
      });
    },
    goRegister () {
      this.$router.push({
        path: '/register'
      });
    }
  }
}

</script>
