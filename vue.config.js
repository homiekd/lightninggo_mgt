module.exports = {
  devServer: {
    // 設置端口訊息
    port: 8888,
    // 設置是否啟動時打開瀏覽器
    open: true,
    // 設置代理
    proxy: {
      // 代理的根路徑
      '/': {
        // 代理的後端路徑
        target: 'http://localhost:8181',
        // 是否開啟根路徑轉換
        changeOrigin: true,
        // 代理路徑更改
        pathReWrite: {
          '^/': '/'
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
