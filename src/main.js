import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@/cores/validate' // [ 表單驗證 ]
import './scss/main.scss' // [ CSS 樣式入口 ]
import '@/cores/autoGlobalBase' // [ 自動全局註冊基本組件 ]

import globalMixin from '@/cores/mixin.js' // [ 全域 mixin 載入 ]

// [ 全域指令載入 ]
import loading from '@/components/loading'
import snackbar from '@/components/snackbar' // 全域 mixin

// [ 權限指令載入 ]
import permissionDirective from '@/directives/permission'

/**
 * Plugins
 */
import moment from '@/plugins/moment' // 全域組件載入

Vue.config.productionTip = false

Vue.use(loading) // $loading 指令
Vue.use(snackbar) // $message 指令
Vue.use(moment) // $moment
Vue.use(globalMixin) // 全域 mixin
Vue.use(permissionDirective) // 權限指令

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  render: h => h(App)
}).$mount('#app')
