import Vue from 'vue'
import VueI18n from 'vue-i18n'

// [ 將 vee-validate 預設的驗證訊息引入 ]
import en from 'vee-validate/dist/locale/en.json'
import tw from 'vee-validate/dist/locale/zh_TW.json'
import cn from 'vee-validate/dist/locale/zh_CN.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-TW',
  messages: {
    en: {
      validation: en.messages
    },
    'zh-TW': {
      validation: {
        ...tw.messages,
        required: '{_field_}為必填',
        is: '{_field_}輸入錯誤',
        is_not: '{_field_}輸入錯誤',
        excludedChinese: '{_field_}不得包含中文',
        password: '{_field_}格式不符合',
        symbol_num: '{_field_}僅能包含數字及符號',
        alpha_num: '{_field_}只能以英文或數字組成',
        excluded: '{_field_}的選項無效',
        ip: '{_field_}格式錯誤',
        excludedEnglishNumber: '{_field_}不包含英文及數字',
        array_length: '{_field_}數量必須介於 {min} 至 {max}',
        date_isBefore: '{_field_}不得早於{target}',
        date_isAfter: '{_field_}不得晚於{target}',
        date_isSameOrBefore: '{_field_}不得早於或等於{target}',
        date_isSameOrAfter: '{_field_}不得晚於或等於{target}',
        date_isAfter_abolish: '{_field_}不得晚於{target}'
      }
    },
    'zh-CN': {
      validation: {
        ...cn.messages,
        required: '{_field_}为必填',
        is: '{_field_}输入错误',
        is_not: '{_field_}输入错误',
        excludedChinese: '{_field_}不得包含中文',
        password: '{_field_}格式不符合',
        symbol_num: '{_field_}仅能包含数字及符号',
        alpha_num: '{_field_}只能以英文或数字组成',
        excluded: '{_field_}的选项无效',
        ip: '{_field_}格式错误',
        excludedEnglishNumber: '{_field_}不包含英文及数字'
      }
    }
  },
  silentFallbackWarn: true,
  silentTranslationWarn: true
})

export default i18n
