<template>
  <v-row>
    <v-col cols="12">
      <base-searchbar title="用戶列表" @search="search">
        <v-row dense>
          <!-- 帳號 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.username"
                outlined
                hide-details
                label="帳號"
              ></base-input>
            </v-row>
          </v-col>

          <!-- 用戶名 -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.cnName"
                outlined
                hide-details
                label="用戶名"
              ></base-input>
            </v-row>
          </v-col>

          <!-- email -->
          <v-col cols="6" md="3">
            <v-row dense>
              <base-input
                v-model="filter.email"
                outlined
                hide-details
                label="信箱"
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
            v-permission="'userMgt_add'"
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
              v-permission="'userMgt_remove'"
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

          <!-- 角色 -->
          <template #Roles="{ item }">
            <v-btn icon @click="roles(item)">
              <v-icon size="20" color="primary">
                mdi-account-multiple
              </v-icon>
            </v-btn>
          </template>

          <!-- 編輯 -->
          <template #Edit="{ item }">
            <v-btn
              v-permission="'userMgt_edit'"
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
    <UserMgtAdd
      v-model="dialog.add.show"
      @afterSubmit="dataBind"
    ></UserMgtAdd>

    <!-- 編輯 -->
    <UserMgtAdd
      :id.sync="dialog.edit.id"
      v-model="dialog.edit.show"
      is-edit
      @afterSubmit="dataBind"
    ></UserMgtAdd>

    <!-- 刪除 -->
    <UserMgtRemove
      :id.sync="dialog.remove.id"
      v-model="dialog.remove.show"
      @afterSubmit="dataBind"
    ></UserMgtRemove>

    <!-- 擁有角色 -->
    <UserRoles
      :id.sync="dialog.roles.id"
      v-model="dialog.roles.show"
      @afterSubmit="dataBind"
    ></UserRoles>
  </v-row>
</template>

<script>
import SysUserService from '@/services/sysUser'
import UserMgtAdd from './UserMgtAdd'
import UserMgtRemove from './UserMgtRemove'
import UserRoles from './UserRoles'

export default {
  name: 'UserMgt',
  components: {
    UserMgtAdd,
    UserMgtRemove,
    UserRoles
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
        text: '帳號',
        value: 'username',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '用戶名',
        value: 'cnName',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '信箱',
        value: 'email',
        align: 'center',
        customized: false,
        width: 100
      },
      {
        text: '角色',
        value: 'Roles',
        align: 'center',
        customized: true,
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
      roles: { show: false, id: -1 },
      remove: { show: false, id: -1 }
    },

    filter: {
      username: '',
      cnName: '',
      email: '',
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0
    }
  }),

  mounted () {
    this.dataBind()
  },

  methods: {
    // [ 取得用戶列表 ]
    async dataBind () {
      try {
        this.listLoading = true

        const dataResponse = await SysUserService.getMany(this.filter)
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

    // [ 角色 ]
    roles (data) {
      this.dialog.roles.id = data.id
      this.dialog.roles.show = true
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
