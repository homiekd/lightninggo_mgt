<template>
  <v-card outlined>
    <!-- 卡片標題/副標題 -->
    <v-card-title v-if="title" :class="titleClass">
      <v-icon
        v-if="prependIcon"
        class="mr-2"
        :class="textColor"
        size="16"
      >
        {{ prependIcon }}
      </v-icon>

      <span class="mr-2" v-text="title"></span>
      <span v-if="subTitle" class="text-body-2 grey--text mr-2" v-text="subTitle"></span>

      <slot name="title-prepend"></slot>

      <v-spacer></v-spacer>

      <slot name="title-append"></slot>

      <span v-if="collapse" class="collapse" @click="collapseToggle">
        <transition
          mode="out-in"
          :duration="150"
          enter-active-class="animate__animated animate__rotateIn"
          leave-active-class="animate__animated animate__rotateOut"
        >
          <v-icon v-if="isCollapse" key="up" size="16">mdi-chevron-up</v-icon>
          <v-icon v-else key="down" size="16">mdi-chevron-down</v-icon>
        </transition>
      </span>
    </v-card-title>

    <!-- 卡片容器 -->
    <v-expand-transition>
      <div v-show="isCollapse">
        <v-card-text :class="bodyClass">
          <slot></slot>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',

  props: {
    title: String,
    subTitle: String,
    bodyClass: String,
    collapse: Boolean,
    prependIcon: String,
    backgroundColor: {
      type: String,
      default: 'grey lighten-3'
    },
    textColor: String
  },

  data: () => ({
    isCollapse: true
  }),

  computed: {
    titleClass () {
      return `${this.textColor} ${this.backgroundColor} text-body-1`
    }
  },

  methods: {
    collapseToggle () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-card {
  &__title {
    font-size: 18px;
  }
}

.collapse-transition {
  transition-duration: 300ms;
}

.collapse {
  cursor: pointer;
}
</style>
