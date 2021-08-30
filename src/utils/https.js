import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import snackbar from '@/components/snackbar'

/**
 * 創建ajax實體
 * 設置請求超時時間
 */
const https = axios.create({
  timeout: 600000
})

// [ Request 攔截器 ]
https.interceptors.request.use((config) => {
  // 如果有 token 則帶入 header
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token}`
  }
  return config
}, (err) => {
  console.log('請求異常' + err)
})

// [ Response 攔截器 ]
https.interceptors.response.use((response) => {
  // 其他再補充
  return response
}, (error) => {
  // 對不同狀態進行處理
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 可能 token 失效所以進行清除
        sessionStorage.clear()
        router.replace('/login')
        snackbar.message({
          color: 'error',
          message: '登入失敗或網頁未授權!'
        })
        break
      case 403:
        // 可能 token 失效所以進行清除
        sessionStorage.clear()
        router.replace('/login')
        snackbar.message({
          color: 'error',
          message: error.response.data.message
        })
        break
      case 404:
        snackbar.message({
          color: 'error',
          message: '找不到網頁!'
        })
        break
      case 500:
        snackbar.message({
          color: 'error',
          message: '內部伺服器錯誤!'
        })
        break
      default:
        snackbar.message({
          color: 'error',
          message: '其他未知錯誤： ' + error.response.data.message
        })
    }
  } else {
    snackbar.message({
      color: 'error',
      message: 'Something happened in setting up the request that triggered an Error ! '
    })
  }
  // 拋出錯誤
  return Promise.reject(error)
})

Vue.prototype.$https = https

export default https
