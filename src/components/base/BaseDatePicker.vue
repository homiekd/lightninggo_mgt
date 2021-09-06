<template>
  <div>
    <v-menu
      v-model="menu"
      absolute
      offset-y
      :top="top"
      :bottom="bottom"
      max-width="320px"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template #activator="{ on }">
        <ValidationProvider
          v-slot="{ errors }"
          :name="name"
          :rules="rules"
          :vid="vid"
          :mode="validMode"
        >
          <v-text-field
            v-model="valueText"
            readonly
            :clearable="clearable"
            :filled="filled"
            :prefix="prefix"
            :suffix="suffix"
            :loading="loading"
            :hide-details="hideDetails"
            :error-messages="errors"
            :prepend-inner-icon="iconPrepend"
            :append-icon="iconAppend"
            :dense="isDense"
            :outlined="outlined"
            :disabled="disabled"
            :label="label"
            v-on="on"
          ></v-text-field>
        </ValidationProvider>
      </template>

      <div>
        <v-container fluid :class="pickerClass">
          <v-row v-if="!mode.noinput && type === 'datetimerange'" no-gutters>
            <v-col cols="6" class="pr-1 mb-2">
              <base-input
                v-model="date[0]"
                outlined
                readonly
                label="開始日期"
                class="mb-1"
                @focus="inputOnFocus('date')"
              ></base-input>

              <base-input
                v-model="date[1]"
                outlined
                readonly
                label="結束日期"
                class="mb-1"
                @focus="inputOnFocus('date')"
              ></base-input>
            </v-col>

            <v-col cols="6" class="pl-1 mb-2">
              <base-input
                v-model="startTime"
                outlined
                readonly
                clearable
                label="開始時間"
                class="mb-1"
                @focus="inputOnFocus('start')"
              ></base-input>

              <base-input
                v-model="endTime"
                outlined
                readonly
                clearable
                label="結束時間"
                class="mb-1"
                @focus="inputOnFocus('end')"
              ></base-input>
            </v-col>
          </v-row>

          <v-row v-if="!mode.noinput && type === 'datetime'" no-gutters>
            <v-col cols="6" class="pr-1 mb-2">
              <base-input
                v-model="date"
                outlined
                readonly
                label="日期"
                class="mb-1"
                @focus="inputOnFocus('date')"
              ></base-input>
            </v-col>

            <v-col cols="6" class="pl-1 mb-2">
              <base-input
                v-model="startTime"
                outlined
                readonly
                clearable
                label="時間"
                class="mb-1"
                @focus="inputOnFocus('start')"
              ></base-input>
            </v-col>
          </v-row>

          <v-row v-if="!mode.noinput && type === 'daterange'" no-gutters>
            <v-col cols="6" class="pr-1 mb-2">
              <base-input
                v-model="date[0]"
                outlined
                readonly
                label="開始日期"
                class="mb-1"
              ></base-input>
            </v-col>

            <v-col cols="6" class="pl-1 mb-2">
              <base-input
                v-model="date[1]"
                outlined
                readonly
                label="結束日期"
                class="mb-1"
              ></base-input>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12">
              <!-- 日期組件 -->
              <v-slide-x-transition mode="out-in">
                <v-date-picker
                  v-if="picker === 'date'"
                  key="datePicker"
                  v-model="date"
                  scrollable
                  full-width
                  no-title
                  locale="tw"
                  :type="mode.type"
                  :range="mode.range"
                  :allowed-dates="allowedDates"
                  :min="min"
                  :max="max"
                  class="picker__date"
                  @input="dateOnInput"
                  @change="dateOnChange"
                ></v-date-picker>

                <!-- 開始時間 -->
                <v-time-picker
                  v-if="picker === 'start'"
                  key="startTimePicker"
                  v-model="startTime"
                  full-width
                  scrollable
                  use-seconds
                  format="24hr"
                  class="picker__time"
                ></v-time-picker>

                <!-- 結束時間 -->
                <v-time-picker
                  v-if="picker === 'end'"
                  key="endTimePicker"
                  v-model="endTime"
                  full-width
                  scrollable
                  use-seconds
                  format="24hr"
                  class="picker__time"
                ></v-time-picker>
              </v-slide-x-transition>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="submitVisible" cols="12" class="d-flex">
              <v-spacer></v-spacer>

              <!-- 預設快捷按鈕 -->
              <!-- <v-btn
                v-for="(option, i) in modePreset"
                :key="i"
                small
                dark
                color="indigo"
                class="mr-2"
                v-text="option"
                @click="presetClick(option)"
              ></v-btn> -->

              <!-- 確定 -->
              <v-btn
                small
                color="primary"
                :disabled="submitDisabled"
                @click="submit"
              >
                確定
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'BaseDatePicker',

  props: {
    name: String,
    rules: [String, Object],
    vid: String,
    validMode: String,
    loading: Boolean,
    hideDetails: [Boolean, String],
    label: String,
    value: [Array, String],
    type: String,
    outlined: Boolean,
    dense: Boolean,
    filled: Boolean,
    prefix: String,
    suffix: String,
    disabled: Boolean,
    top: Boolean,
    bottom: Boolean,
    allowedDates: Function,
    min: String,
    max: String,
    clearable: {
      type: Boolean,
      defalut: true
    }
  },

  data: () => ({
    menu: false,
    picker: 'date',
    date: [],
    startTime: null,
    endTime: null
  }),

  computed: {
    isDark () {
      return this.$vuetify.theme.dark
    },

    isDense () {
      return this.outlined || this.filled || this.dense
    },

    iconPrepend () {
      return this.outlined ? '' : 'mdi-calendar'
    },

    iconAppend () {
      return this.outlined ? 'mdi-calendar' : ''
    },

    pickerClass () {
      return {
        picker: true,
        'picker--light': !this.isDark
      }
    },

    mode () {
      switch (this.type) {
        case 'datetimerange':
          return {
            type: 'date',
            range: true,
            noinput: false
          }
        case 'datetime':
          return {
            type: 'date',
            range: false,
            noinput: false
          }
        case 'daterange':
          return {
            type: 'date',
            range: true,
            noinput: false
          }
        case 'month':
          return {
            type: 'month',
            range: false,
            noinput: true
          }
        default:
          return {
            type: 'date',
            range: false,
            noinput: true
          }
      }
    },

    modePreset () {
      switch (this.type) {
        case 'datetimerange':
          return ['近一月', '近一週', '今天']
        case 'daterange':
          return ['近一月', '近一週']
        case 'datetime':
          return ['一週前', '昨天', '今天']
        default:
          return []
      }
    },

    valueText: {
      get () {
        if (this.mode.range) return this.value.length === 2 ? this.value.join(' ~ ') : ''
        return this.$moment(this.value).isValid() ? this.value : ''
      },
      // 點擊清除按鈕後觸發 setter
      set (val) {
        this.mode.range ? this.$emit('input', []) : this.$emit('input', '')
      }
    },

    dateConbined () {
      const r = new RegExp(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/)
      const startTime = r.test(this.startTime) ? this.startTime : '00:00:00'
      const endTime = r.test(this.endTime) ? this.endTime : '23:59:59'

      if (this.mode.range) {
        const arr = [...this.date]
        const dateValid = arr.every(date => this.$moment(date).isValid())
        if (!dateValid || arr.length !== 2) return []

        if (this.type === 'datetimerange') {
          arr[0] = new Date(`${arr[0]}T${startTime}`)
          arr[1] = new Date(`${arr[1]}T${endTime}`)

          for (let i = 0; i < arr.length; i++) {
            arr[i] = this.$moment(arr[i]).format('YYYY-MM-DD HH:mm:ss')
          }

          return arr
        } else if (this.type === 'daterange') {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = this.$moment(arr[i]).format('YYYY-MM-DD')
          }

          return arr
        }

        return []
      } else {
        if (this.type === 'datetime') {
          const date = new Date(`${this.date}T${startTime}`)
          const dateValid = this.$moment(date).isValid()
          return dateValid ? this.$moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
        }
        return ''
      }
    },

    submitDisabled () {
      return this.mode.range ? this.dateConbined.length !== 2 : this.dateConbined === ''
    },

    submitVisible () {
      return !this.type || this.type !== 'month'
    }
  },

  watch: {
    menu (val) {
      this.valueParse()
    },

    value: {
      immediate: true,
      handler (val) {
        this.valueParse()
      }
    }
  },

  methods: {
    // [ 解析外部傳進的日期 - 選單關閉 (menu) 及 外部日期 (value) 發生變動時觸發 ]
    valueParse () {
      if (Array.isArray(this.value)) {
        let arr = [...this.value]
        const valid = arr.every(item => this.$moment(item).isValid())
        arr = this.dateSort(arr)

        if (this.type === 'datetimerange' && arr.length === 2 && valid) {
          this.startTime = this.$moment(arr[0]).format('HH:mm:ss')
          this.endTime = this.$moment(arr[1]).format('HH:mm:ss')

          arr[0] = this.$moment(arr[0]).format('YYYY-MM-DD')
          arr[1] = this.$moment(arr[1]).format('YYYY-MM-DD')

          this.date = arr
        } else if (this.type === 'daterange' && arr.length === 2 && valid) {
          arr[0] = this.$moment(arr[0]).format('YYYY-MM-DD')
          arr[1] = this.$moment(arr[1]).format('YYYY-MM-DD')

          this.startTime = null
          this.endTime = null
          this.date = arr
        } else {
          this.date = []
          this.startTime = null
          this.endTime = null
        }
      } else if (typeof this.value === 'string' || this.value === null) {
        const valid = this.$moment(this.value).isValid()

        if (this.type === 'datetime') {
          this.date = valid ? this.$moment(this.value).format('YYYY-MM-DD') : ''
          this.startTime = valid ? this.$moment(this.value).format('HH:mm:ss') : null
          this.endTime = null
        } else if (this.type === 'month') {
          this.date = valid ? this.$moment(this.value).format('YYYY-MM') : ''
          this.startTime = null
          this.endTime = null
        } else {
          this.date = valid ? this.$moment(this.value).format('YYYY-MM-DD') : ''
          this.startTime = null
          this.endTime = null
        }
      }
    },

    // [ 日期組件多選且長度等於2時觸發]
    dateOnChange (date) {
      if (date.length === 2) {
        this.startTime = this.startTime ? this.startTime : '00:00:00'
        this.endTime = this.endTime ? this.endTime : '23:59:59'
        this.date = this.dateSort(date)
      }
    },

    // [ 日期組件綁定值更新時觸發 ]
    dateOnInput (date) {
      // date 模式下點選日期直接更新外部值並關閉選單
      if (!this.type || this.type === 'month') {
        this.$emit('input', date)
        this.menu = false
      }

      // datetime 模式下點選日期帶入預設時間
      if (this.type === 'datetime') { this.startTime = this.startTime ? this.startTime : '00:00:00' }
    },

    // [ 範圍日期排序 ]
    dateSort (arr = []) {
      return arr.sort(
        (a, b) =>
          this.$moment(a).format('YYYYMMDDHHmmss') -
          this.$moment(b).format('YYYYMMDDHHmmss')
      )
    },

    // [ 日期/時間組件切換 ]
    inputOnFocus (type) {
      this.picker = type
    },

    // [ 預設快捷選項 ]
    presetClick (option) {
      const today = this.$moment().format('YYYY-MM-DD')

      const yesterday = this.$moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')

      const week = this.$moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD')

      const month = this.$moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD')

      this.startTime = '00:00:00'
      this.endTime = '23:59:59'

      switch (this.type) {
        case 'datetimerange':
          switch (option) {
            case '今天':
              this.date = [today, today]
              break
            case '近一週':
              this.date = [week, today]
              break
            case '近一月':
              this.date = [month, today]
          }
          break
        case 'daterange':
          switch (option) {
            case '近一週':
              this.date = [week, today]
              break
            case '近一月':
              this.date = [month, today]
              break
          }
          break
        case 'datetime':
          switch (option) {
            case '今天':
              this.date = today
              break
            case '昨天':
              this.date = yesterday
              break
            case '一週前':
              this.date = week
              break
          }
          break
      }
    },

    submit () {
      this.$emit('input', this.dateConbined)
      this.menu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.picker {
  background: #373740;
  &__date {
    box-shadow: none;
  }
  &__time {
    box-shadow: none;
  }
  &::v-deep .v-card__actions {
    padding: 0;
  }
  &--light {
    background: #fff;
  }
}
</style>
