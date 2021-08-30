<template>
  <v-app-bar
    app
    dark
    dense
    clipped-left
    class="header"
    color="primary">
    <!-- 左側收合按鈕/LOGO -->
    <div class="header__left">
      <v-app-bar-nav-icon @click.stop="drawerToggle"></v-app-bar-nav-icon>

      <!-- LOGO -->
      <router-link
        to="/"
        custom
        class="header__logo"
        v-if="$vuetify.breakpoint.smAndUp"
      ><v-img max-height="34"
              max-width="34"
              :src="require('@/assets/lightningGo.png')"></v-img>
      </router-link>
      <span id="logo">閃電購物後台管理系統</span>
    </div>

    <!-- 撐開中間寬度 -->
    <v-spacer></v-spacer>

    <!-- 右側功能按鈕 -->
    <div class="header__right">
      <!-- 會員功能選單 -->
      <the-header-account></the-header-account>

      <v-divider vertical class="grey mx-2 my-3"></v-divider>

      <!-- 登出按鈕 -->
      <v-btn
        width="36"
        height="36"
        icon
        @click="logout">
          <v-icon size="18">mdi-logout-variant</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import TheHeaderAccount from '@/components/layout/TheHeaderAccount'

export default {
  name: 'TheHeader',

  components: {
    TheHeaderAccount
  },

  methods: {
    drawerToggle () {
      this.$store.commit('settings/SET_DRAWER', !this.$store.state.settings.drawer)
    },

    logout () {
      this.$store.dispatch('user/logout', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 10;
  &__logo {
    cursor: pointer;
  }
  &__left {
    display: flex;
    align-items: center;
  }
  &__right {
    display: flex;
    align-items: center;
  }
}
#logo{
  font-size: 22px;
  font-weight: bold;
  background: #FFEFBA;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-clip: inherit;
  -webkit-background-clip: text;
  color: transparent;
  margin-left: 8px;
}
</style>
