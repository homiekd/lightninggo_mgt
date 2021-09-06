<template>
  <component :is="sidebarType" :menu="menu"></component>
</template>

<script>
import TheSidebarDesktop from './TheSidebarDesktop'
import TheSidebarMobile from './TheSidebarMobile'

export default {
  name: 'TheSidebar',

  components: {
    TheSidebarDesktop,
    TheSidebarMobile
  },

  data: () => ({
    menu: [
      {
        title: '產品管理',
        children: [
          {
            title: '產品列表',
            path: '/productMgt/productList'
          },
          {
            title: '產品種類',
            path: '/productMgt/test'
          }
        ]
      }
    ]
  }),

  computed: {
    // menu () {
    //   return this.$store.state.user.menu
    // },
    sidebarType () {
      return this.$vuetify.breakpoint.mdAndDown ? 'TheSidebarMobile' : 'TheSidebarDesktop'
    }
  }
}
</script>
