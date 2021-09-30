/* 用戶相關 */
import router from '../../router'
import SysUserService from '@/services/sysUser'

const state = {
  accessToken: '',
  identity: {},
  menu: [],
  permission: []
}

// [ Mutations Types ]
const types = {
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_IDENTITY: 'SET_IDENTITY',
  SET_MENU: 'SET_MENU',
  SET_PERMISSION: 'SET_PERMISSION'
}

const mutations = {
  [types.SET_ACCESS_TOKEN] (state, payload) {
    state.accessToken = payload
  },

  [types.SET_IDENTITY] (state, payload) {
    state.identity = payload
  },

  [types.SET_MENU] (state, payload) {
    state.menu = payload
  },

  [types.SET_PERMISSION] (state, payload) {
    state.permission = payload
  }
}

const actions = {
  // [ 設定 Token ]
  setAccessToken ({ commit }, token) {
    commit(types.SET_ACCESS_TOKEN, token)
  },

  // [ clear user ]
  clearToken ({ commit }) {
    commit(types.SET_ACCESS_TOKEN, '')
    commit(types.SET_IDENTITY, {})
    commit(types.SET_MENU, [])
    commit(types.SET_PERMISSION, [])
  },

  // [ 登出 ]
  async logout ({ dispatch, state }) {
    try {
      await SysUserService.logout()
      dispatch('clearToken')
      router.push('/login')
    } catch (error) {
      throw new Error(error)
    }
  },

  // [ 取得用戶資訊 ]
  async updateAllSessionStorange ({ commit }, data) {
    try {
      commit(types.SET_ACCESS_TOKEN, data.token)
      commit(types.SET_IDENTITY, data.identity)
      commit(types.SET_MENU, data.menuTree)
      commit(types.SET_PERMISSION, data.permissions)
    } catch (error) {
      throw new Error(error)
    }
  }
}

const getters = {
  identity (state) {
    return state.identity
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
