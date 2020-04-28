import Vue from 'vue'
//import axios from './plugins/axios'
import App from './App.vue'
import './plugins/axios'
import router from './router'
import store from './store'
import { Button, Select, Input, MessageBox, Message} from 'element-ui';

Vue.config.productionTip = false
//Vue.prototype.$axios = axios;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button)
Vue.use(Select)
Vue.use(Input);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
