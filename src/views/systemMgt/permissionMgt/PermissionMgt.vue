<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="權限列表" @search="search">
        <v-row dense>
          <!-- 權限名稱 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.name"
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
                v-model="filter.code"
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
            v-permission="'permissionMgt_add'"
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
            <v-btn
              v-permission="'permissionMgt_edit'"
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
    <PermissionMgtAdd
      v-model="dialog.add.show"
      @afterSubmit="dataBind"
    ></PermissionMgtAdd>

    <!-- 編輯 -->
    <PermissionMgtEdit
      :id.sync="dialog.edit.id"
      v-model="dialog.edit.show"
      is-edit
      @afterSubmit="dataBind"
    ></PermissionMgtEdit>
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
    listLoading: false,

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
      edit: { show: false, id: -1 }
    },

    filter: {
      name: '',
      code: '',
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    }
  }),

  mounted () {
    this.dataBind()
  },

  methods: {
    // [ 取權限列表 ]
    async dataBind () {
      try {
        this.listLoading = true

        const dataResponse = await SysPermissionService.getMany(this.filter)
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
    add () {
      this.dialog.add.show = true
    },

    // [ 編輯 ]
    edit (data) {
      this.dialog.edit.id = data.id
      this.dialog.edit.show = true
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
