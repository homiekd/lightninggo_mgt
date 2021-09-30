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
          <!-- 角色名稱 -->
          <v-col cols="12">
            <base-input
              v-model="forms.name"
              rules="required"
              outlined
              hide-details="auto"
              name="名稱"
              label="名稱"
              placeholder="請輸入角色名稱"
            ></base-input>
          </v-col>

          <!-- 角色描述 -->
          <v-col cols="12">
            <base-input
              v-model="forms.description"
              rules="required"
              outlined
              hide-details="auto"
              name="描述"
              label="描述"
              placeholder="請輸入角色描述"
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
import SysRoleService from '@/services/sysRole'

export default {
  name: 'RoleMgtAdd',

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
      name: '',
      description: ''
    }
  }),

  computed: {
    title () {
      return this.isEdit ? '編輯角色' : '新增角色'
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

        const dataResponse = await SysRoleService.get(payload)

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
        const dataResponse = await SysRoleService.add(payload)
        await this.sharedResponse(dataResponse)
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 編輯 ]
    async edit (payload) {
      try {
        const dataResponse = await SysRoleService.edit(payload)
        await this.sharedResponse(dataResponse)
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 重置表單 ]
    reset () {
      this.$emit('input', false)
      this.forms = {
        name: '',
        description: ''
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
