<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    <div style="margin: 20px 0;"></div>
    <el-input v-model="user.username" placeholder="userName"></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input v-model="user.pass" placeholder="Pass" show-password></el-input>
    <div style="margin: 20px 0;"></div>
    <el-button type="primary" @click="submitForm">登录</el-button>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        pass: ''
      }
    }
  },
  components: {
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
        console.log('---------obj-------');
        console.log(obj);
        if (res.data.code === 0) {
          // 登录成功
          console.log(res.data.message);
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          // 保存token
          this.$store.commit("set_token", res.data.token);
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
    }
  }
}

</script>
