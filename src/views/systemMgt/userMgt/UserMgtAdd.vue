<template>
  <base-dialog
    persistent
    :title="title"
    :loading="loading"
    :value="value"
    @input="close"
  >
    <template #body>
      <ValidationObserver ref="form">
        <v-row dense>
          <!-- 姓名 -->
          <v-col cols="12">
            <base-input
              v-model="forms.cnName"
              rules="required"
              outlined
              hide-details="auto"
              name="姓名"
              label="姓名"
              placeholder="請輸入中文姓名或英文名"
            ></base-input>
          </v-col>

          <!-- 帳號 -->
          <v-col cols="12">
            <base-input
              v-model="forms.username"
              :disabled="isEdit"
              rules="required|email"
              outlined
              hide-details="auto"
              name="帳號"
              label="帳號"
              placeholder="請輸入帳號(email格式)"
            ></base-input>
          </v-col>

          <!-- 信箱 -->
          <v-col cols="12">
            <base-input
              v-model="forms.email"
              rules="required|email"
              outlined
              hide-details="auto"
              name="信箱"
              label="信箱"
              placeholder="請輸入信箱"
            ></base-input>
          </v-col>

          <!-- 密碼 -->
          <v-col cols="12">
            <base-input
              v-if="!isEdit"
              v-model="forms.password"
              hide-details="auto"
              outlined
              label="密碼*"
              type="password"
              name="密碼"
              rules="required|password|max:20"
              vid="confirmation"
            ></base-input>
          </v-col>

          <!-- 密碼確認 -->
          <v-col cols="12">
            <base-input
              v-if="!isEdit"
              v-model="forms.passwordConfrim"
              outlined
              label="確認密碼*"
              type="password"
              name="確認密碼"
              rules="required|password|confirmed:confirmation"
            ></base-input>
          </v-col>
        </v-row>
      </ValidationObserver>
    </template>

    <template #footer>
      <v-spacer></v-spacer>
      <v-btn outlined color="error" @click="close">
        關閉
      </v-btn>
      <v-btn outlined color="primary" @click="submit">
        確定
      </v-btn>
    </template>
  </base-dialog>
</template>

<script>
import SysUserService from '@/services/sysUser'

export default {
  name: 'UserMgtAdd',

  props: {
    value: Boolean,
    id: {
      type: Number,
      default: -1
    },
    isEdit: Boolean
  },

  data: () => ({
    loading: false,
    forms: {
      cnName: '',
      username: '',
      email: '',
      password: '',
      passwordConfrim: ''
    }
  }),

  computed: {
    title () {
      return this.isEdit ? '編輯用戶' : '新增用戶'
    }
  },

  watch: {
    value: {
      handler (value) {
        if (!value) return

        if (this.isEdit) {
          // 編輯模式載入單筆資料
          this.dataBind()
        }
      }
    }
  },

  methods: {
    // [ 單筆資料取得 ]
    async dataBind () {
      try {
        this.loading = true

        const payload = this.id

        const dataResponse = await SysUserService.get(payload)

        await this.sharedResponse(dataResponse, { useSuccessMessage: false })

        this.forms = dataResponse.data.data
      } catch (error) {
        this.showError(error)
        this.close()
      } finally {
        this.loading = false
      }
    },

    // [ 表單送出 ]
    async submit () {
      try {
        const success = await this.$refs.form.validate()

        if (!success) return

        this.isEdit ? await this.edit(this.forms) : await this.add(this.forms)

        this.close()

        this.$emit('afterSubmit')
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 新增 ]
    async add (payload) {
      try {
        const dataResponse = await SysUserService.add(payload)
        await this.sharedResponse(dataResponse)
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 編輯 ]
    async edit (payload) {
      try {
        const dataResponse = await SysUserService.edit(payload)
        await this.sharedResponse(dataResponse)
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 重置表單 ]
    reset () {
      this.$emit('input', false)
      this.forms = {
        cnName: '',
        username: '',
        email: '',
        password: '',
        passwordConfrim: ''
      }
    },

    // [ 關閉視窗 ]
    close () {
      this.reset()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
