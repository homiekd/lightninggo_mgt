<template>
  <base-dialog persistent :value="value" @input="close">
    <template #body>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-icon size="72" color="red">
              fa-exclamation-triangle
            </v-icon>
          </div>
        </v-col>

        <v-col cols="12">
          <div class="text-center red--text text-h5 text-sm-h4">
            是否確定刪除？
          </div>
        </v-col>
      </v-row>
    </template>

    <template #footer>
      <v-spacer></v-spacer>
      <v-btn outlined color="error" @click="close">
        取消
      </v-btn>
      <v-btn outlined color="primary" @click="submit">
        確定
      </v-btn>
    </template>
  </base-dialog>
</template>

<script>
export default {
  name: 'ProductListRemove',

  props: {
    value: Boolean
  },

  methods: {
    // [ 表單送出 ]
    submit () {},

    // [ 關閉視窗 ]
    close () {
      this.reset()
      this.$emit('input', false)
    },

    // [ 重置表單內容 ]
    reset () {}
  }
}
</script>

<style lang="scss" scoped></style>
