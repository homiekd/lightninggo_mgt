import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend, configure } from 'vee-validate'
import {
  regex,
  required,
  excluded,
  min,
  max,
  min_value, // eslint-disable-line
  max_value, // eslint-disable-line
  alpha_num, // eslint-disable-line
  email,
  confirmed,
  is,
  numeric,
  integer,
  size,
  between,
  mimes,
  is_not // eslint-disable-line
} from 'vee-validate/dist/rules'
import i18n from './locale'
import moment from 'moment'

configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(field)
    return i18n.t(`validation.${values._rule_}`, values)
  }
})

extend('regex', regex)
extend('required', required)
extend('excluded', excluded)
extend('min', min)
extend('max', max)
extend('min_value', min_value)
extend('max_value', max_value)
extend('alpha_num', alpha_num)
extend('email', email)
extend('confirmed', confirmed)
extend('is', is)
extend('numeric', numeric)
extend('integer', integer)
extend('between', between)
extend('mimes', mimes)
extend('is_not', is_not)

extend('size', {
  validate: size.validate,
  params: size.params,
  message: (field, placeholders) =>
    `${field}的大小不能超過 ${placeholders.size / 1000} MB`
})

extend('size_multiple', {
  validate: (value, { limit }) => {
    const sizeLimit = limit * 1000
    const allSize = value.map(item => item.size)
    const total = allSize.reduce((acc, cur) => {
      return acc + cur
    }, 0)

    return total < sizeLimit
  },
  message: (field, { limit }) => `${field}的檔案總和不能超過 ${limit / 1000} MB`,
  params: ['limit']
})

extend('duplicate', {
  validate: excluded.validate,
  message: field => `${field}不支援重複選項`
})

// [自訂規則 - 排除中文]
extend('excludedChinese', {
  validate: value => {
    const regex = new RegExp(/^[^\u4e00-\u9fa5]+$/)
    return regex.test(value)
  }
})

// [自訂規則 - 限數字及符號]
extend('symbol_num', {
  validate: value => {
    const regex = new RegExp(/^[^\u4e00-\u9fa5_a-zA-Z]+$/)
    return regex.test(value)
  }
})

// [自訂規則 - 密碼驗證]
// 至少6個字符，至少1個英文字母(不分大小寫)和1個數字(不包含特殊字符及空白鍵)
extend('password', {
  validate: value => {
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    return regex.test(value)
  }
})

// [自訂規則 - IP驗證]
// IPv4範圍 0.0.0.0 ~ 255.255.255.255(不包含空白鍵)
extend('ip', {
  validate: value => {
    const regex = new RegExp(
      /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
    )
    return regex.test(value)
  }
})

// [自訂規則 - 繁體中文驗證]
// 排除英文及數字
extend('excludedEnglishNumber', {
  validate: value => {
    const regex = new RegExp(/^[^A-Za-z_0-9]+$/)
    return regex.test(value)
  }
})

// [自訂規則 - 驗證陣列長度範圍 ]
extend('array_length', {
  validate: (value, args) => {
    if (value.length >= args.min) {
      if (value.length <= args.max) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  params: ['min', 'max']
})

// [ 驗證 A日期 不得早於 B日期 ]
extend('date_isBefore', {
  validate: (value, { target }) => {
    return !moment(value).isBefore(target)
  },
  params: ['target']
})

// [ 驗證 A日期 不得早於或等於 B日期 ]
extend('date_isSameOrBefore', {
  validate: (value, { target }) => {
    return !moment(value).isSameOrBefore(target)
  },
  params: ['target']
})

// [ 驗證 A日期 不得晚於 B日期 ]
extend('date_isAfter', {
  validate: (value, { target }) => {
    return !moment(value).isAfter(target)
  },
  params: ['target']
})

// [ 驗證 A日期 不得晚於或等於 B日期s ]
extend('date_isSameOrAfter', {
  validate: (value, { target }) => {
    return !moment(value).isSameOrAfter(target)
  },
  params: ['target']
})

// [ 驗證 A日期 不得晚於 B日期，如裁撤日、開始日相同，日期只能是裁撤日的隔天 ]
extend('date_isAfter_abolish', {
  validate: (value, { target, startDate }) => {
    if (moment(target).isSame(startDate)) {
      if (
        moment(value).isSame(
          moment(startDate)
            .add(1, 'days')
            .format('YYYY-MM-DD')
        )
      ) { return true }
    }

    return !moment(value).isAfter(target)
  },
  params: ['target', 'startDate']
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
