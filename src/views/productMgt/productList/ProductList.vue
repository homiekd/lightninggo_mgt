<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="商品列表">
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
          <template #Status="{ item }">
            <v-chip
              dark
              small
              :color="item.Status === 1 ? 'success' : 'error'"
              v-text="item.Status === 1 ? '啟用' : '停用'"
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
    <!-- 刪除 -->
    <ProductListRemove v-model="dialog.remove.show"></ProductListRemove>
  </v-row>
</template>

<script>
import ProductListRemove from './ProductListRemove'

export default {
  name: 'ProductList',
  components: {
    ProductListRemove
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
        value: 'brand',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '品牌名稱',
        value: 'brand',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '品牌網站',
        value: 'brand',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '品牌描述',
        value: 'brand',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '排序',
        value: 'brand',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '狀態',
        value: 'Status',
        align: 'center',
        customized: true,
        width: 100
      },
      {
        text: '建立時間',
        value: 'brand',
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

    dataSource: [
      {
        brand: 'coffee'
      }
    ],

    dialog: {
      remove: { show: false }
    },

    filter: {
      PageIndex: 1,
      PageSize: 10,
      TotalCount: 0
    }

  }),
  methods: {
    // [ 編輯 ]
    edit (item) {
      console.log('編輯')
    },

    // [ 刪除 ]
    remove (item) {
      this.dialog.remove.show = true
      console.log('刪除')
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
