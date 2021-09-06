import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@/cores/validate' // [ 表單驗證 ]
import '@/cores/autoGlobalBase' // [ 自動全局註冊基本組件 ]
// import '@/cores/https'

import axios from 'axios' // 主要的AJAX套件
import VueAxios from 'vue-axios' // 將它轉為 VUE的套件
import snackbar from '@/components/snackbar' // 全域組件載入
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

/**
 * Plugins
 */
import moment from '@/plugins/moment'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(snackbar) // $message 指令
Vue.use(moment) // $moment

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  render: h => h(App)
}).$mount('#app')
