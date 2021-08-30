<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import Snackbar from '@/components/snackbar/Snackbar'

export default {
  name: 'App',

  components: {
    Snackbar
  },

  data: () => ({
    //
  })
}
</script>
