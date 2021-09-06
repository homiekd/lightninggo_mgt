<template>
  <v-breadcrumbs v-if="crumbs.length" :items="crumbs" class="px-0">
    <template #item="{ item }">
      <v-breadcrumbs-item v-if="item.to === '/'" :to="item.to" exact>
        <v-icon size="18" color="primary">
          mdi-home
        </v-icon>
      </v-breadcrumbs-item>

      <v-breadcrumbs-item v-else exact :to="item.to">
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>

    <!-- BreadCrumbs 連接箭頭 -->
    <template #divider>
      <v-icon>mdi-chevron-double-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'TheBreadcrumb',

  computed: {
    // [ 取得當前路由 breadcrumb ]
    crumbs () {
      const index = this.$route.matched.length - 1
      const path = this.$route.matched[index].meta.breadcrumb
        ? [{ text: 'Home', to: '/' }, ...this.$route.matched[index].meta.breadcrumb]
        : []
      return path
    }
  }
}
</script>
