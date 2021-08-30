import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
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
    // [ 網站設置 ]
    settings: {
    },
    // [ 用戶登入相關 ]
    user: {
    }
  })
})

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    name: sessionStorage.getItem('name') || '',
    roles: JSON.parse(sessionStorage.getItem('roles') || '[]'),
    permissions: JSON.parse(sessionStorage.getItem('permissions') || '[]')
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      sessionStorage.setItem('token', data)
    },
    setName (state, data) {
      state.token = data
      sessionStorage.setItem('name', data)
    },
    /**
     * 儲存角色訊息
     */
    setRoles (state, data) {
      state.token = data
      sessionStorage.setItem('roles', JSON.stringify(data))
    },
    /**
     * 儲存權限訊息
     */
    setPermissions (state, data) {
      state.token = data
      sessionStorage.setItem('permissions', JSON.stringify(data))
    }
  },
  modules: {
    settings,
    snackbar
  },
  plugins: [vuexLocal.plugin]
})
