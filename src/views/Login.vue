<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                dark
                color="primary"
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="sysUser.username"
                    :rules="emailRules"
                    prepend-icon="mdi-account"
                    name="username"
                    label="UserName"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="sysUser.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="show1 ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  type="submit"
                  @click="validate"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import SysUserService from '@/services/sysUser'
import snackbar from '@/components/snackbar'

export default {
  name: 'Login',
  data () {
    return {
      show1: false,
      valid: true,
      sysUser: {
        username: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: {
        required: value => !!value || 'Required',
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'clearToken',
      'updateAllSessionStorange'
    ]),

    validate () {
      if (this.$refs.form.validate()) {
        this.login()
      }
    },
    async login () {
      try {
        const dataResponse = await SysUserService.login(this.sysUser)
        await this.sharedResponse(dataResponse, { useSuccessMessage: false })

        // 檢查後端Result code 不等於200,就拋出錯誤訊息
        if (dataResponse.data.code !== 200) {
          snackbar.message({
            color: 'error',
            message: dataResponse.data.data
          })
          return
        }

        // 用戶資訊 存入 store
        const loginData = dataResponse.data.data
        if (loginData.token) this.updateAllSessionStorange(loginData)

        this.$router.push('/dashboard')
      } catch (error) {
        this.showError(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
