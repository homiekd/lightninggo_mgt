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
      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title>
            放role
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title>放username</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </base-header-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheHeaderAccount',

  computed: {
    ...mapGetters('user', ['identity'])
  },

  methods: {
    ...mapActions('user', ['setShowEditPassword']),

    // [ 編輯個人密碼 ]
    editPassword () {
      // 更改密碼狀態存入 store
      this.setShowEditPassword(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item{
  flex: 1 1 auto;
}
</style>
