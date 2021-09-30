<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="品牌列表" @search="search">
        <v-row dense>
          <!-- 品牌編碼 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.code"
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
                v-model="filter.name"
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
                v-model="filter.description"
                outlined
                hide-details
                label="品牌描述"
              ></base-input>
            </v-row>
          </v-col>

          <!-- 狀態 -->
          <v-col cols="6" md="3">
            <base-select
              v-model="filter.state"
              outlined
              hide-details
              label="狀態"
            ></base-select>
          </v-col>

          <!-- 建立時間 -->
          <v-col cols="6" md="3">
            <base-date-picker
              v-model="filter.createdDate"
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
            v-permission="'productBrandMgt_add'"
            color="white"
            class="primary--text"
            @click="add"
          >
            新增
          </v-btn>
        </template>

        <base-table
          :loading="listLoading"
          :headers="headers"
          :items="dataSource"
          mobile-breakpoint="0"
        >
          <!-- 刪除按鈕 -->
          <template #Remove="{ item }">
            <v-btn
              v-permission="'productBrandMgt_remove'"
              icon
              color="red"
              @click="remove(item)"
            >
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
            <v-btn
              v-permission="'productBrandMgt_edit'"
              icon
              @click="edit(item)"
            >
              <v-icon size="20" color="primary">
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
        </base-table>

        <!-- 分頁 -->
        <base-pagination
          v-model="filter.pageIndex"
          class="mt-6"
          :page-size.sync="filter.pageSize"
          :page-count="filter.totalCount"
          @change="changePage"
        ></base-pagination>
      </base-card>
    </v-col>

    <!-- dialog 彈窗 -->
    <!-- 新增 -->
    <ProductBrandMgtAdd
      v-model="dialog.add.show"
      @afterSubmit="dataBind"
    ></ProductBrandMgtAdd>

    <!-- 編輯 -->
    <ProductBrandMgtAdd
      :id.sync="dialog.edit.id"
      v-model="dialog.edit.show"
      is-edit
      @afterSubmit="dataBind"
    ></ProductBrandMgtAdd>

    <!-- 刪除 -->
    <ProductBrandMgtRemove
      :id.sync="dialog.remove.id"
      v-model="dialog.remove.show"
      @afterSubmit="dataBind"
    ></ProductBrandMgtRemove>
  </v-row>
</template>

<script>
import ProductBrandService from '@/services/productBrand'
import ProductBrandMgtAdd from './ProductBrandMgtAdd'
import ProductBrandMgtRemove from './ProductBrandMgtRemove'

export default {
  name: 'ProductBrandMgt',
  components: {
    ProductBrandMgtAdd,
    ProductBrandMgtRemove
  },

  data: () => ({
    listLoading: false,

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
      edit: { show: false, id: -1 },
      remove: { show: false, id: -1 }
    },

    filter: {
      code: '',
      name: '',
      description: '',
      state: true,
      createdDate: null,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    }

  }),

  mounted () {
    this.dataBind()
  },

  methods: {
    // [ 取品牌列表 ]
    async dataBind () {
      try {
        this.listLoading = true

        const dataResponse = await ProductBrandService.getMany(this.filter)
        await this.sharedResponse(dataResponse, { useSuccessMessage: false })

        this.dataSource = dataResponse.data.data
        this.filter.totalCount = dataResponse.data.totalCount
      } catch (error) {
        this.showError(error)
      } finally {
        this.listLoading = false
      }
    },

    // [ 新增 ]
    add (item) {
      this.dialog.add.show = true
    },

    // [ 編輯 ]
    edit (data) {
      this.dialog.edit.id = data.id
      this.dialog.edit.show = true
    },

    // [ 刪除 ]
    remove (data) {
      this.dialog.remove.id = data.id
      this.dialog.remove.show = true
    },

    // [ 搜尋 ]
    search () {
      this.filter.pageIndex = 1
      this.dataBind()
    },

    // [ 換頁 ]
    changePage (data) {
      this.filter.pageIndex = data
      this.dataBind()
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
