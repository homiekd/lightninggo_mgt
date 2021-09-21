<template>
  <base-dialog
    title="商品品牌 - 新增"
    persistent
    :value="value"
    @input="close"
  >
    <template #body>
      <ValidationObserver ref="form">
        <v-row dense>
          <!-- v-model="forms.CompanyID" -->
          <!-- 品牌編碼 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="品牌編碼"
              label="品牌編碼"
              placeholder="請輸入品牌編碼"
            ></base-input>
          </v-col>

          <!-- 品牌名稱 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="品牌名稱"
              label="品牌名稱"
              placeholder="請輸入品牌名稱"
            ></base-input>
          </v-col>

          <!-- 品牌網址 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="品牌網址"
              label="品牌網址"
              placeholder="請輸入品牌網址"
            ></base-input>
          </v-col>

          <!-- 排序 -->
          <v-col cols="12">
            <base-input
              outlined
              hide-details="auto"
              name="排序"
              label="排序"
              placeholder="排序 ex.1 2 3"
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
  name: 'ProductBrandMgtAdd',

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
