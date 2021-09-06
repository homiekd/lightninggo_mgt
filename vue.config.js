module.exports = {
  devServer: {
    // 設置端口訊息
    port: 8888,
    // 設置是否啟動時打開瀏覽器
    open: true,
    // 配置跨域
    proxy: {
      // Springboot後台api
      '/api': {
        target: 'http://localhost:8181/',
        // 如果要代理 websockets
        ws: true,
        // 允許跨域
        changOrigin: true,
        // 請求的時候使用這個api就可以
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
