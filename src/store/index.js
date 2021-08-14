import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import settings from './modules/settings'

Vue.use(Vuex)

/**
 * Vuex 持久化
 * 這邊設定的 State 會保存到 LocalStorage
 * 不希望保存到 LocalStorage 的 State 不用加入
 */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    // [ 網站設置 ]
    settings: {
    },
    // [ 用戶登入相關 ]
    user: {

    }
  })
})

export default new Vuex.Store({
  modules: {
    settings
  },
  plugins: [vuexLocal.plugin]
})
