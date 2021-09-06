import moment from 'moment'

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$moment', { value: moment })
  }
}
