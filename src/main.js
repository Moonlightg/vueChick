import Vue from 'vue'
import VueLazyload from 'vue-lazyload'; // 图片懒加载
//import axios from './plugins/axios'
//注册filter
import filters from '../utils/filters.js'
import App from './App.vue'
import './plugins/axios'
import './styles/main.css'
import './styles/base-index.less'
import router from './router'
import store from './store'
import loadingIcon from './assets/icon/loading-icon.svg';
import loadingError from './assets/icon/loading-error.svg';
import { Icon, Button, Dialog, Select, Input, Loading, MessageBox, Message, Tabs, TabPane} from 'element-ui';
import { vueBaberrage } from 'vue-baberrage'
Vue.use(vueBaberrage);

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: loadingIcon,
  error: loadingError
});

//Vue.prototype.$axios = axios;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Icon);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Input);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
