<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import storage from './plugins/storage'
export default {
  name: 'app',
  created () {
    //在页面加载时读取缓存里的状态信息
    if (storage.get('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state,storage.get('store')));
    }
    //在页面刷新时将vuex里的信息保存到缓存里
    window.addEventListener("beforeunload",()=>{
      this.$store.commit("set_store");
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.el-message {
  min-width: 300px;
}
</style>
