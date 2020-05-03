<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    <div style="margin: 20px 0;"></div>
    <el-input v-model="user.username" placeholder="userName"></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input v-model="user.pass" placeholder="Pass" show-password></el-input>
    <div style="margin: 20px 0;"></div>
    <el-button type="primary" @click="submitForm">注册</el-button>
    <el-button type="primary" @click="goLogin">登录</el-button>

  </div>
</template>

<script>

export default {
  name: 'Register',
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
      if (this.user.pass.length < 6) {
        this.$message({
          message: '密码的长度至少6位',
          type: 'error'
        });
        return;
      }
      const obj = {
        username: this.user.username,
        pass: this.user.pass
      };
      this.$ajax.post('/api/register', obj).then((res) => {
        console.log('---------res-------');
        console.log(res);
        console.log('---------obj-------');
        console.log(obj);
        if (res.data.code === 0) {
          console.log('注册成功')
          this.$message({
						message: '注册成功!',
						type: 'success'
					});
					// 跳转到登录
          setTimeout(() => {
            this.$router.push({
              path: '/login'
            });
          }, 2000);
        } else if (res.data.status === 1001) {
          console.log('该用户名已经注册！')
          this.$message({
						message: '该用户名已经注册！',
						type: 'error'
					});
        } else {
          console.log(res.body.errorMsg);
        }
      });
    },
    goLogin() {
      this.$router.push({
        path: '/login'
      });
    }
  }
}

</script>
