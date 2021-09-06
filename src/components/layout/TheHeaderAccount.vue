<template>
  <base-header-menu :title="'使用者資訊'" width="100%">
    <template #trigger="{ on }">
      <v-list-item v-on="on">
        <v-list-item-content>
          <v-icon>mdi-account</v-icon>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template #append-icon>
      <v-btn
        icon
        color="primary"
        @click="editPassword"
      >
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>
    </template>

    <template #content>
      <v-subheader>角色</v-subheader>
      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title
            v-for="role in roles"
            :key="role"
          >
            {{ role }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>使用者</v-subheader>
      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </base-header-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SysUserService from '@/services/sysUser'

export default {
  name: 'TheHeaderAccount',
  data () {
    return {
      username: this.$store.state.name,
      roles: this.$store.state.roles
    }
  },

  computed: {
    ...mapGetters('user', ['identity'])
  },

  methods: {
    ...mapActions('user', ['setShowEditPassword']),

    // [ 編輯個人密碼 ]
    async editPassword () {
      const dataResponse = await SysUserService.getInfo()
      if (dataResponse && dataResponse.status === 200 && dataResponse.data.code === 200) {
        console.log('取得後台使用者基本訊息: ', dataResponse)
      } else {
        this.$message({
          color: 'error',
          message: dataResponse.data.data == null ? dataResponse.data.message : dataResponse.data.data
        })
      }

      // 更改密碼狀態存入 store
      // this.setShowEditPassword(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item{
  flex: 1 1 auto;
}
</style>
