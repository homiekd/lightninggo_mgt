<template>
  <base-dialog
    title="商品品牌 - 編輯"
    persistent
    :value="value"
    @input="close"
  >
    <template #body>
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
        >
          <v-tab>
            內容
          </v-tab>
          <v-tab>
            圖片
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>內容在這裡...</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
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
  name: 'ProductBrandMgtEdit',

  props: {
    value: Boolean
  },

  data: () => ({
    forms: {
      // data
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
