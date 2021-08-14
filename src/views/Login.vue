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
                    v-model="user.username"
                    :rules="emailRules"
                    prepend-icon="mdi-account"
                    name="username"
                    label="UserName"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="user.password"
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
      user: {
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
      const api = `${process.env.VUE_APP_SPRINGBOOT_PORT}/login`
      console.log(api)
      // const vm = this
      // console.log(vm.user)
    }
  }
}
</script>

<style scoped>

</style>
