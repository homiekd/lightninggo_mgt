import store from '@/store'

export default {
  install (Vue) {
    Vue.prototype.$loading = this.overlay
  },

  overlay (visible, options = {}) {
    const defaults = {
      lock: true
    }

    options = Object.assign({}, defaults, options)

    const payload = {
      visible: !!visible,
      lock: true
    }

    if (!options.lock) payload.lock = false
    if (!visible) payload.lock = false

    store.dispatch('settings/setLoading', payload)
  }
}
