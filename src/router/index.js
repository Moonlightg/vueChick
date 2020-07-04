import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import storage from '../plugins/storage'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      index: 1,
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      index: 2,
      requireAuth: false
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    // 某些页面规定必须登录后才能查看 ，可以在router中配置meta，将需要登录的requireAuth设为true，
    meta: {
      index: 2,
      requireAuth: true
    }
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('../views/Log.vue'),
    meta: {
      index: 3,
      requireAuth: true
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('../views/Friends.vue'),
    meta: {
      index: 3,
      requireAuth: true
    }
  },
  {
    path: '/penguin',
    name: 'Penguin',
    component: () => import('../views/Penguin.vue'),
    meta: {
      index: 3,
      requireAuth: true
    }
  },
  {
    path: '/friendsHome',
    name: 'FriendsHome',
    component: () => import('../views/FriendsHome.vue'),
    meta: {
      index: 4,
      requireAuth: true
    }
  },
  {
    path: '/luckDraw',
    name: 'LuckDraw',
    component: () => import('../views/LuckDraw.vue'),
    meta: {
      index: 3,
      requireAuth: true
    }
  }
  
]

const router = new VueRouter({
  routes,
  mode:'history'   //去除#号
})

// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
if (storage.get("token")) {
  store.dispatch('setToken', storage.get("token"));
}
router.beforeEach((to, from, next) => {
  // 判断要去的路由有没有requiresAuth
  // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      console.log('有token');
      next(); //有token,进行request请求，后台还会验证token
    } else {
      console.log('没有token,请先登录');
      next({
        path: "/login",
        // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
        query: { redirect: to.fullPath }  
      });
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
  //如果本地 存在 token 则 不允许直接跳转到 登录页面
  if(to.fullPath === "/" || to.fullPath === "/login"){
    if(store.state.token != '' && store.state.isLogin){
      console.log("已经登录过了,不能再次进去登录界面");
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
  //如果本地 存在 token 则 不允许直接跳转到 注册页面
  if(to.fullPath === "/register"){
    if(store.state.token){
      console.log('请先退出登录');
      next({
        path: '/index'
      })
    }else {
      next();
    }
  }
});

export default router
