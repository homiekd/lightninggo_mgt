<template>
  <base-dialog
    :title="title"
    persistent
    :loading="loading"
    :value="value"
    @input="close"
  >
    <template #body>
      <ValidationObserver ref="form">
        <v-row dense>
          <!-- 品牌編碼 -->
          <v-col cols="12">
            <base-input
              v-model="forms.code"
              rules="required"
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
              v-model="forms.name"
              rules="required"
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
              v-model="forms.url"
              outlined
              hide-details="auto"
              name="品牌網址"
              label="品牌網址"
              placeholder="請輸入品牌網址"
            ></base-input>
          </v-col>

          <!-- 品牌描述 -->
          <v-col cols="12">
            <base-input
              v-model="forms.description"
              outlined
              hide-details="auto"
              name="品牌描述"
              label="品牌描述"
              placeholder="請輸入品牌描述"
            ></base-input>
          </v-col>

          <!-- 排序 -->
          <v-col cols="12">
            <base-input
              v-model="forms.sort"
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
import ProductBrandService from '@/services/productBrand'

export default {
  name: 'ProductBrandMgtAdd',

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
      code: '',
      name: '',
      url: '',
      description: '',
      sort: -1
    }
  }),

  computed: {
    title () {
      return this.isEdit ? '編輯商品品牌' : '新增商品品牌'
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

        const dataResponse = await ProductBrandService.get(payload)

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
        const dataResponse = await ProductBrandService.add(payload)
        await this.sharedResponse(dataResponse)
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 編輯 ]
    async edit (payload) {
      try {
        const dataResponse = await ProductBrandService.edit(payload)
        await this.sharedResponse(dataResponse)
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 重置表單 ]
    reset () {
      this.$emit('input', false)
      this.forms = {
        code: '',
        name: '',
        url: '',
        description: '',
        sort: -1
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
