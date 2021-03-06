/* 網站設定相關 */
const state = {
  loading: {
    visible: false,
    lock: true
  },
  drawer: true,
  primaryColor: '#BB9D8D'
}

// [ Mutations Types ]
const types = {
  SET_LOADING: 'SET_LOADING',
  SET_DRAWER: 'SET_DRAWER'
}

const mutations = {
  [types.SET_LOADING] (state, payload) {
    state.loading = payload
  },

  [types.SET_DRAWER] (state, payload) {
    state.drawer = payload
  }
}

const actions = {
  setDrawer ({ commit }, payload) {
    commit(types.SET_DRAWER, payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
