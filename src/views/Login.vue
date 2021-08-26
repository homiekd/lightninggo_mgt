<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        fluid
        fill-height
      >
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn  color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
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
                <v-spacer />
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
export default {
  name: 'Login',
  data () {
    return {
      show1: false,
      valid: true,
      snackbar: false,
      text: '',
      timeout: 2000,
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
    login () {
      // api 伺服器路徑 + 所申請的的 API Path
      const api = `${process.env.VUE_APP_SPRINGBOOT_PORT}/sys/login`
      const vm = this
      this.axios.post(api, vm.sysUser).then((response) => {
        console.log(response.data)
        if (response.data.code === 200) {
          const tokenBody = response.data.data
          const tokenHead = tokenBody.tokenHead
          const token = tokenBody.token
          vm.$store.commit('settings/setToken', tokenHead + token)
          vm.$router.push('/dashboard')
        } else {
          this.snackbar = true
          this.text = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
