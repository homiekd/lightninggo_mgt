import store from '@/store'

export default {
  install (Vue) {
    Vue.prototype.$message = this.message
  },

  async message (options = {}) {
    const defaults = {
      color: 'success',
      timeout: 2500,
      message: ''
    }

    options = Object.assign({}, defaults, options)
    options.visible = true

    store.dispatch('snackbar/setVisible', false)

    setTimeout(() => {
      store.dispatch('snackbar/openSnackbar', options)
    }, 100)
  }
}
