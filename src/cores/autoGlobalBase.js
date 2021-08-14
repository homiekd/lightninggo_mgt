import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '@/components/base', // 組件資料夾的相對路徑

  false, // 是否查看子資料夾

  /Base[A-Z]\w+\.(vue|js)$/ // 匹配基本組件檔案名稱正則表達式
)

requireComponent.keys().forEach(fileName => {
  // 取得組件配置
  const componentConfig = requireComponent(fileName)

  // 取得大駝峰式的組件名稱
  const componentName = upperFirst(
    camelCase(
      // 取得檔案名稱
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  Vue.component(
    componentName,

    componentConfig.default || componentConfig // 默認導出導出組件|退回到組件的根目錄
  )
})

export default requireComponent
