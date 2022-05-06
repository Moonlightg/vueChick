import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from '../plugins/storage'


Vue.use(VueRouter)

const routes = [
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
    path: '/',
    redirect: '/index',
    component: () => import('../views/Index.vue'),
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
    path: '/studyList',
    name: 'StudyList',
    component: () => import('../views/StudyList.vue'),
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

router.beforeEach((to, from, next) => {
  let token = storage.get("token");
  let isLogin = storage.get("isLogin");
  let entryUrl = null;

  // 判断要去的路由有没有requiresAuth
  // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (token == "" || token == undefined) {
      console.log('没有token,请先登录22');
      if (to.name !== "Login") {
        entryUrl = to.fullPath;
      }
      next({ name: "Login" });
    } else if (entryUrl) {
      console.log('有token22');
      let url = entryUrl;
      entryUrl = null;
      next(url);
    } else {
      next();
    }

    // if (token) {
    //   console.log('有token');
    //   next(); //有token,进行request请求，后台还会验证token
    // } else {
    //   console.log('没有token,请先登录');
    //   next({
    //     path: "/login",
    //     // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
    //     query: { redirect: to.fullPath }
    //   });
    // }
  } else {
    next(); //如果无需token,那么随它去吧
  }
  //如果本地 存在 token 则 不允许直接跳转到 登录页面
  if(to.fullPath === "/" || to.fullPath === "/login"){
    if(token != null && token != '' && isLogin){
      console.log("已经登录过了,不能再次进去登录界面");
      next({
        path:from.fullPath
      });
      return;
    } else {
      next();
    }
  }
  //如果本地 存在 token 则 不允许直接跳转到 注册页面
  if(to.fullPath === "/register"){
    if(token){
      console.log('请先退出登录');
      next({
        path:from.fullPath
      })
    }else {
      next();
    }
  }
});

export default router
