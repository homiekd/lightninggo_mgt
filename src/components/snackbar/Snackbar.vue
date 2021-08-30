<template>
  <v-snackbar
    v-model="visibleBind"
    top
    :color="color"
    :timeout="timeout"
  >
    <div class="d-flex align-center">
      <v-icon
        class="mr-2"
        color="white"
      >
        {{ color === 'success' ? 'mdi-check' : 'mdi-alert-rhombus' }}
      </v-icon>
      {{ message }}
    </div>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Snackbar',

  computed: {
    ...mapState('snackbar', ['visible', 'color', 'timeout', 'message']),

    visibleBind: {
      get () {
        return this.visible
      },
      set (val) {
        this.$store.dispatch('snackbar/setVisible', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
