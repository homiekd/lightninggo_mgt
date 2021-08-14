<template>
  <v-navigation-drawer
    :value="drawer"
    app
    clipped
    floating
    class="elevation-6"
    color="primary"
  >
    <v-row class="fill-height flex-nowrap" no-gutters>
      <v-list class="sidebar">
        <v-list-group
          v-for="(item) in menu"
          :key="item.title"
          :prepend-icon="item.action"
          :group="item.group"
          no-action
          color="white"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="text-body-2" v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            :to="child.path"
            exact
          >
            <v-list-item-content>
              <v-list-item-title class="text-body-2" v-text="child.title">
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TheSidebar',

  props: {
    menu: {
      type: Array,
      default: () => ([])
    }
  },

  data: () => ({
    isActive: ''
  }),

  computed: {
    drawer () {
      return this.$store.state.settings.drawer
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 0;
  flex-grow: 1;
  padding: 15px;
  border-radius: 0;
}
</style>
