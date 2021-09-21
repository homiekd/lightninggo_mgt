<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="品牌列表">
        <v-row dense>
          <!-- 品牌編碼 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                outlined
                hide-details
                label="品牌編碼"
              ></base-input>
            </v-row>
          </v-col>

          <!-- 品牌名稱 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                outlined
                hide-details
                label="品牌名稱"
              ></base-input>
            </v-row>
          </v-col>

          <!-- 品牌描述 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                outlined
                hide-details
                label="品牌描述"
              ></base-input>
            </v-row>
          </v-col>

          <!-- 狀態 -->
          <v-col cols="6" md="3">
            <base-select
              outlined
              hide-details
              label="狀態"
            ></base-select>
          </v-col>

          <!-- 建立時間 -->
          <v-col cols="6" md="3">
            <base-date-picker
              outlined
              label="建立時間"
            ></base-date-picker>
          </v-col>
        </v-row>
      </base-searchbar>
    </v-col>

    <!-- 數據列表 -->
    <v-col cols="12">
      <base-card title="數據列表" prepend-icon="fa-list">
        <!-- 標題尾端插槽 -->
        <template #title-append>
          <v-btn
            color="white"
            class="primary--text"
            @click="add"
          >
            新增
          </v-btn>
        </template>

        <base-table
          :headers="headers"
          :items="dataSource"
          mobile-breakpoint="0"
        >
          <!-- 刪除按鈕 -->
          <template #Remove="{ item }">
            <v-btn icon color="red" @click="remove(item)">
              <v-icon size="20">
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </template>

          <!-- 狀態 -->
          <template #state="{ item }">
            <v-chip
              dark
              small
              :color="item.state === true ? 'success' : 'error'"
              v-text="item.state === true ? '啟用' : '停用'"
            ></v-chip>
          </template>

          <!-- 編輯 -->
          <template #Edit="{ item }">
            <v-btn icon @click="edit(item)">
              <v-icon size="20" color="primary">
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
        </base-table>

        <!-- 分頁 -->
        <base-pagination
          v-model="filter.PageIndex"
          class="mt-6"
          :page-size.sync="filter.PageSize"
          :page-count="filter.TotalCount"
          @change="changePage"
        ></base-pagination>
      </base-card>
    </v-col>

    <!-- dialog 彈窗 -->
    <!-- 新增 -->
    <ProductBrandMgtAdd v-model="dialog.add.show"></ProductBrandMgtAdd>
    <!-- 新增 -->
    <ProductBrandMgtEdit v-model="dialog.edit.show"></ProductBrandMgtEdit>
    <!-- 刪除 -->
    <ProductBrandMgtRemove v-model="dialog.remove.show"></ProductBrandMgtRemove>
  </v-row>
</template>

<script>
import ProductBrandService from '@/services/productBrand'
import ProductBrandMgtAdd from './ProductBrandMgtAdd'
import ProductBrandMgtEdit from './ProductBrandMgtEdit'
import ProductBrandMgtRemove from './ProductBrandMgtRemove'

export default {
  name: 'ProductBrandMgt',
  components: {
    ProductBrandMgtAdd,
    ProductBrandMgtEdit,
    ProductBrandMgtRemove
  },

  data: () => ({
    headers: [
      {
        text: '刪除',
        value: 'Remove',
        align: 'center',
        customized: true,
        width: 80
      },
      {
        text: '品牌編碼',
        value: 'code',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '品牌名稱',
        value: 'name',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '品牌網站',
        value: 'url',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '品牌描述',
        value: 'description',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '排序',
        value: 'sort',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '狀態',
        value: 'state',
        align: 'center',
        customized: true,
        width: 100
      },
      {
        text: '建立時間',
        value: 'createdDate',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '編輯',
        value: 'Edit',
        align: 'center',
        customized: true,
        width: 100
      }
    ],

    dataSource: [],

    dialog: {
      add: { show: false },
      edit: { show: false },
      remove: { show: false }
    },

    filter: {
      PageIndex: 1,
      PageSize: 10,
      TotalCount: 0
    }

  }),

  mounted () {
    this.dataBind()
  },

  methods: {
    // [ 取品牌列表 ]
    async dataBind () {
      const dataResponse = await ProductBrandService.getMany(this.filter)
      await this.sharedResponse(dataResponse, { useSuccessMessage: false })
      console.log('dataResponse.data: ', dataResponse.data)
      this.dataSource = dataResponse.data.data
    },

    // [ 新增 ]
    add (item) {
      console.log('新增商品品牌')
      this.dialog.add.show = true
    },

    // [ 編輯 ]
    edit (item) {
      console.log('編輯商品品牌')
      this.dialog.edit.show = true
    },

    // [ 刪除 ]
    remove (item) {
      console.log('刪除商品品牌')
      this.dialog.remove.show = true
    },

    // [ 換頁 ]
    changePage (data) {
      this.filter.PageIndex = data
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
