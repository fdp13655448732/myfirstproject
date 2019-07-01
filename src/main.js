import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入路由 router
import router from './router.js'

//引入第三方插件请求数据
import axios from 'axios'
Vue.prototype.$axios = axios

//引入mintUI
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'; 

new Vue({
  render: h => h(App),
  data:{
    
  },
  router
}).$mount('#app')
