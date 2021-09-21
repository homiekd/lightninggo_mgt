<template>
  <base-dialog
    title="用戶 - 擁有角色"
    persistent
    :value="value"
    @input="close"
  >
    <template #body>
      <ValidationObserver ref="form">
        <v-row dense>
          <tbody>
            <tr v-for="name in userRoles" :key="name">
              <td style="width:30%">
                <span class="px-3">{{ name }}</span>
              </td>
            </tr>
          </tbody>
        </v-row>
      </ValidationObserver>
    </template>

    <template #footer>
      <v-spacer></v-spacer>
      <v-btn outlined color="error" @click="close">
        關閉
      </v-btn>
    </template>
  </base-dialog>
</template>

<script>
import SysUserService from '@/services/sysUser'

export default {
  name: 'UserRoles',

  props: {
    value: Boolean,
    id: {
      type: Number,
      default: -1
    }
  },

  data: () => ({
    userRoles: []
  }),

  watch: {
    value: {
      handler (value) {
        if (!value) return
        this.getUserRoles()
      }
    }
  },

  methods: {
    async getUserRoles () {
      try {
      // 後端api取值
        const payload = this.id

        const dataResponse = await SysUserService.getUsetRoles(payload)

        await this.sharedResponse(dataResponse, { useSuccessMessage: false })

        this.userRoles = dataResponse.data.data
      } catch (error) {
        this.showError(error)
      }
    },

    // [ 關閉視窗 ]
    close () {
      this.reset()
      this.$emit('input', false)
    },

    // [ 重置表單內容 ]
    reset () {
      this.$emit('update:id', -1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
