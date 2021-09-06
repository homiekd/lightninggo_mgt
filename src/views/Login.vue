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
import SysUserService from '@/services/sysUser'

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
    validate () {
      if (this.$refs.form.validate()) {
        this.login()
      }
    },
    async login () {
      const dataResponse = await SysUserService.login(this.sysUser)
      if (dataResponse && dataResponse.status === 200 && dataResponse.data.code === 200) {
        const loginData = dataResponse.data.data
        const token = loginData.token
        const username = loginData.username
        const roles = loginData.roles
        let rolesArr = []
        if (roles) {
          rolesArr = roles.split(';')
        }
        this.$store.commit('setToken', token)
        this.$store.commit('setName', username)
        this.$store.commit('setRoles', rolesArr)
        this.$router.push('/dashboard')
      } else {
        this.$message({
          color: 'error',
          message: dataResponse.data.data == null ? dataResponse.data.message : dataResponse.data.data
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
