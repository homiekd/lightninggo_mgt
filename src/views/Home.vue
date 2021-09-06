<template>
  <div>
    <the-header></the-header>
    <the-sidebar></the-sidebar>

    <v-main>
      <v-container fluid class="px-lg-12">
        <v-slide-x-transition mode="out-in">
          <the-breadcrumb :key="$route.fullPath"></the-breadcrumb>
        </v-slide-x-transition>

        <v-fade-transition mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader'
import TheSidebar from '@/components/layout/TheSidebar'
import TheBreadcrumb from '@/components/layout/TheBreadcrumb'

export default {
  name: 'Home',
  components: {
    TheHeader,
    TheSidebar,
    TheBreadcrumb
  }
}
</script>
