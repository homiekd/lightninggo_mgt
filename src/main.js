import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios' // 主要的AJAX套件
import VueAxios from 'vue-axios' // 將它轉為 VUE的套件

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '@/cores/autoGlobalBase' // [ 自動全局註冊基本組件 ]

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  render: h => h(App)
}).$mount('#app')
