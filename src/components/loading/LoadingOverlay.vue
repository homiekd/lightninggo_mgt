<template>
  <v-overlay :value="loading.visible" z-index="999">
    <v-progress-circular color="white" indeterminate :size="40"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoadingOverlay',

  watch: {
    loading (val) {
      if (val && this.loading.lock) {
        document.documentElement.classList.add('overflow-y-hidden')
      } else {
        document.documentElement.classList.remove('overflow-y-hidden')
      }
    }
  },

  computed: {
    ...mapState('settings', ['loading'])
  }
}
</script>
