<template>
  <base-dialog
    title="權限 - 編輯"
    persistent
    :value="value"
    @input="close"
  >
    <template #body>
      <ValidationObserver ref="form">
        <v-row dense>
          <!-- v-model="forms.CompanyID" -->
          <!-- 父階名稱 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="父階名稱"
              label="父階名稱"
              placeholder="請輸入父階名稱(select item tree)"
            ></base-input>
          </v-col>

          <!-- 權限名稱 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="權限名稱"
              label="權限名稱"
              placeholder="請輸入權限名稱"
            ></base-input>
          </v-col>

          <!-- 權限編碼 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="權限編碼"
              label="權限編碼"
              placeholder="請輸入權限編碼 (ex.systemMgt)"
            ></base-input>
          </v-col>

          <!-- 權限類型 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="權限類型"
              label="權限類型"
              placeholder="請輸入權限類型(select item)"
            ></base-input>
          </v-col>

          <!-- Web地址 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="Web地址"
              label="Web地址"
              placeholder="請輸入Web地址 (ex./systemMgt/ooxx)"
            ></base-input>
          </v-col>

          <!-- icon -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="icon"
              label="icon"
              placeholder="請輸入icon (ex.mdi-plus)"
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
export default {
  name: 'PermissionMgtEdit',

  props: {
    value: Boolean
  },

  data: () => ({
    forms: {

    }
  }),

  methods: {
    submit () {},

    // [ 重置表單 ]
    reset () {
      this.$emit('input', false)
      this.forms = {

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
