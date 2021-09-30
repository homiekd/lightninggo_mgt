import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import settings from './modules/settings'
import snackbar from './modules/snackbar'

Vue.use(Vuex)

/**
 * Vuex 持久化
 * 這邊設定的 State 會保存到 LocalStorage
 * 不希望保存到 LocalStorage 的 State 不用加入
 */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    // [ 用戶登入相關 ]
    user: {
      accessToken: state.user.accessToken,
      identity: state.user.identity,
      menu: state.user.menu,
      permission: state.user.permission
    }
  })
})

export default new Vuex.Store({
  modules: {
    user,
    settings,
    snackbar
  },
  plugins: [vuexLocal.plugin]
})
