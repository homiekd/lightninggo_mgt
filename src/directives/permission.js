import store from '@/store'

const check = (el, binding) => {
  if (typeof binding.value === 'string') {
    const value = binding.value.replace("'", '')
    const permission = store.state.user.permission
    const hasPermission = permission.some(item => item === value)

    if (hasPermission) {
      el.classList.remove('permission-hide')
    } else {
      el.classList.add('permission-hide')
    }
  }
}

export default {
  install (Vue) {
    Vue.directive('permission', {
      bind (el, binding) {
        check(el, binding)
      },
      update (el, binding) {
        if (binding.oldValue !== binding.value) check(el, binding)
      },
      unbind (el, binding) {
        setTimeout(() => {
          el.classList.remove('permission-hide')
        }, 300)
      }
    })
  }
}
