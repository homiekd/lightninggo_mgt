/**
 * 全局 snackbar 設定
 */
const state = {
  visible: false,
  color: '',
  timeout: 6000,
  message: ''
}

// [ Mutations Types ]
const types = {
  SET_VISIBLE: 'SET_VISIBLE',
  SET_COLOR: 'SET_COLOR',
  SET_TIMEOUT: 'SET_TIMEOUT',
  SET_MESSAGE: 'SET_MESSAGE'
}

const mutations = {
  [types.SET_VISIBLE] (state, payload) {
    state.visible = payload
  },
  [types.SET_COLOR] (state, payload) {
    state.color = payload
  },
  [types.SET_TIMEOUT] (state, payload) {
    state.timeout = payload
  },
  [types.SET_MESSAGE] (state, payload) {
    state.message = payload
  }
}

const actions = {
  setVisible ({ commit }, payload) {
    commit(types.SET_VISIBLE, payload)
  },

  openSnackbar ({ commit }, payload) {
    commit(types.SET_COLOR, payload.color)
    commit(types.SET_TIMEOUT, payload.timeout)
    commit(types.SET_MESSAGE, payload.message)
    commit(types.SET_VISIBLE, payload.visible)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
