<template>
  <div id="app">
    <transition :name="animate"> 
      <router-view class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
import storage from './plugins/storage'
export default {
  name: 'app',
  data(){
      return {
          animate:''
      }
  },
  created () {
    //在页面加载时读取缓存里的状态信息
    if (storage.get('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state,storage.get('store')));
    }
    //在页面刷新时将vuex里的信息保存到缓存里
    window.addEventListener("beforeunload",()=>{
      this.$store.commit("set_store");
    })
  },
  //使用watch 监听$router的变化
  //如果to索引大于from索引,判断为前进状态,反之则为后退状态
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index){
      //设置动画名称
        this.animate= 'slide-left';
      }else if(to.meta.index < from.meta.index){
        this.animate= 'slide-right';
      } else {
        this.animate= 'slide-info';
      }
    }
  }
}
window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #77cefb;
  width: 100%;
  height: 100%;
  position:relative; /*给正文内容块的父级随便添加个定位属性*/
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
.Router {
  position:absolute; /*给正文内容router-view添加absolute定位使其脱离标准文档流*/
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-info-enter-active,
.slide-info-leave-active {
  will-change: transform;
  transition: all 500ms;
}
.slide-info--enter {
  opacity: 0;
}
 
.slide-info--leave-active {
  opacity: 0;
}
 
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
 
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
 
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
 
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
