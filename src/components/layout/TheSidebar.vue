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
        title: '系統配置',
        children: [
          {
            title: '用戶管理',
            path: '/systemMgt/userMgt'
          },
          {
            title: '角色管理',
            path: '/systemMgt/roleMgt'
          },
          {
            title: '權限管理',
            path: '/systemMgt/permissionMgt'
          }
        ]
      },
      {
        title: '商品管理',
        children: [
          {
            title: '品牌管理',
            path: '/productMgt/productBrandMgt'
          },
          {
            title: '分類管理',
            path: '/productMgt/productCategoriesMgt'
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
