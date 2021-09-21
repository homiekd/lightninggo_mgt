<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="權限列表">
        <v-row dense>
          <!-- 權限名稱 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                outlined
                hide-details
                label="權限名稱"
              ></base-input>
            </v-row>
          </v-col>
          <!-- 權限編碼 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                outlined
                hide-details
                label="權限編碼"
              ></base-input>
            </v-row>
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
          <!-- 狀態 -->
          <template #available="{ item }">
            <v-chip
              dark
              small
              :color="item.available === true ? 'success' : 'error'"
              v-text="item.available === true ? '啟用' : '停用'"
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
    <PermissionMgtAdd v-model="dialog.add.show"></PermissionMgtAdd>
    <!-- 編輯 -->
    <PermissionMgtEdit v-model="dialog.edit.show"></PermissionMgtEdit>
  </v-row>
</template>

<script>
import SysPermissionService from '@/services/sysPermission'
import PermissionMgtAdd from './PermissionMgtAdd'
import PermissionMgtEdit from './PermissionMgtEdit'

export default {
  name: 'PermissionMgt',

  components: {
    PermissionMgtAdd,
    PermissionMgtEdit
  },

  data: () => ({
    headers: [
      {
        text: '權限名稱',
        value: 'name',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '權限編碼',
        value: 'code',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '權限類型',
        value: 'resourcetype',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: 'Web位址',
        value: 'url',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '層級',
        value: 'level',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '狀態',
        value: 'available',
        align: 'center',
        customized: true,
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
      edit: { show: false }
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
    // [ 取權限列表 ]
    async dataBind () {
      const dataResponse = await SysPermissionService.getMany(this.filter)
      await this.sharedResponse(dataResponse, { useSuccessMessage: false })
      console.log('dataResponse.data: ', dataResponse.data)
      this.dataSource = dataResponse.data.data
    },
    // [ 新增 ]
    add () {
      console.log('新增權限')
      this.dialog.add.show = true
    },

    // [ 編輯 ]
    edit (item) {
      console.log('編輯權限')
      this.dialog.edit.show = true
    },

    // [ 換頁 ]
    changePage (data) {
      console.log('換頁')
      this.filter.PageIndex = data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
