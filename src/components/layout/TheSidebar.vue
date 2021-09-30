<template>
  <component :is="sidebarType" :menu="menu"></component>
</template>

<script>
import TheSidebarDesktop from './TheSidebarDesktop'

export default {
  name: 'TheSidebar',

  components: {
    TheSidebarDesktop
  },

  data: () => ({}),

  computed: {
    menu () {
      return this.$store.state.user.menu
    },
    sidebarType () {
      return 'TheSidebarDesktop'
    }
  }
}
</script>
