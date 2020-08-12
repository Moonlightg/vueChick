<template>
  <div style="opacity: .1" class="main register-box">
    <div class="login-head">
      <Cbee></Cbee>
      <p>Penguin Manor</p>
    </div>
    <div class="login-form">
      <div style="margin: 20px 0;"></div>
      <el-input v-model="user.username" placeholder="userName"></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input v-model="user.pass" placeholder="Pass" show-password></el-input>
      <div style="margin: 20px 0;"></div>
      <el-button type="primary" @click="submitForm">注册</el-button>
      <el-button type="text" @click="goLogin">已有账号,前往登录</el-button>
    </div>
  </div>
</template>

<script>
import Cbee from '../components/scene/bg/Cbee.vue'
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
        if (res.data.code === 0) {
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
