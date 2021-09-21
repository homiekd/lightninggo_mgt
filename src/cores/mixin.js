export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        /**
           * 共用的 Ajax Response，用來做一般呼叫 Ajax 後顯示訊息用
           */
        sharedResponse (response, options) {
          let params = {
            useErrorCodeMsg: true,
            useSuccessMessage: true,
            useErrorMessage: true,
            timeout: 2000
          }

          params = Object.assign(params, options)

          return new Promise((resolve, reject) => {
            if (!response.data.code === 200) {
              if (params.useErrorMessage) {
                this.$message({
                  color: 'error',
                  message: response.data.message,
                  timeout: params.timeout
                })
              }

              reject(new Error(response.data.message))
            } else {
              if (params.useSuccessMessage) {
                this.$message({
                  color: 'success',
                  message: '成功',
                  timeout: params.timeout
                })
                resolve()
              } else {
                resolve()
              }
            }
          })
        },

        hasPermission (privatePermission) {
          if (privatePermission) {
            const permission = this.$store.state.user.permission
            const hasPermission = permission.some(item => item === privatePermission)
            return hasPermission
          }
        },

        // [ 顯示錯誤訊息 ]
        showError (error) {
          if (error.name !== 'Error') {
            this.$message({
              color: 'error',
              message: this.$i18n.t('Shared.fail')
            })
          }
        }
      }
    })
  }
}
