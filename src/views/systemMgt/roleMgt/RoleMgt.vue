<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="角色列表" @search="search">
        <v-row dense>
          <!-- 角色名稱 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.name"
                outlined
                hide-details
                label="角色名稱"
              ></base-input>
            </v-row>
          </v-col>

          <!-- 角色描述 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.description"
                outlined
                hide-details
                label="角色描述"
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
          :loading="listLoading"
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
    <RoleMgtAdd
      v-model="dialog.add.show"
      @afterSubmit="dataBind"
    ></RoleMgtAdd>

    <!-- 編輯 -->
    <RoleMgtAdd
      :id.sync="dialog.edit.id"
      v-model="dialog.edit.show"
      is-edit
      @afterSubmit="dataBind"
    ></RoleMgtAdd>

    <!-- 刪除 -->
    <RoleMgtRemove
      :id.sync="dialog.remove.id"
      v-model="dialog.remove.show"
      @afterSubmit="dataBind"
    ></RoleMgtRemove>
  </v-row>
</template>

<script>
import SysRoleService from '@/services/sysRole'
import RoleMgtAdd from './RoleMgtAdd'
import RoleMgtRemove from './RoleMgtRemove'

export default {
  name: 'RoleMgt',
  components: {
    RoleMgtAdd,
    RoleMgtRemove
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
        text: '角色名稱',
        value: 'name',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '角色描述',
        value: 'description',
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
      edit: { show: false, id: -1 },
      remove: { show: false, id: -1 }
    },

    filter: {
      name: '',
      description: '',
      pageIndex: 1,
      pageSize: 10,
      potalCount: 0
    }

  }),

  mounted () {
    this.dataBind()
  },

  methods: {
    // [ 取角色列表 ]
    async dataBind () {
      try {
        this.listLoading = true

        const dataResponse = await SysRoleService.getMany(this.filter)
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
