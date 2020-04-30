<template>
  <div class="hello">
    <h1>您好,{{ username }}</h1>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'Index',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(["username"])
  },
  components: {

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
      var aaa = this.username;
      console.log(aaa);
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
