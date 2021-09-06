<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    :max-width="maxWidth"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    :persistent="persistent"
    :transition="transition"
    :scrollable="scrollable"
  >
    <v-card :dark="dark" :color="color">
      <!-- Fullscreen 模式下顯示的標題 -->
      <v-toolbar v-if="fullscreen && title" dark color="primary" height="48" class="mb-6">
        <v-btn v-if="!disabledClose" icon dark @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title" class="text-subtitle-1"></v-toolbar-title>
      </v-toolbar>

      <!-- 非 Fullscreen 模式下顯示的標題 -->
      <v-card-title v-if="!fullscreen" class="text-subtitle-1">
        <span v-if="title" v-text="title"></span>
        <v-spacer></v-spacer>
        <v-btn v-if="!disabledClose" icon>
          <v-icon @click="$emit('input', false)">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>

      <v-card-actions v-if="$scopedSlots.footer" class="pa-4">
        <slot name="footer"></slot>
      </v-card-actions>

      <!-- 讀取狀態效果 -->
      <v-overlay absolute z-index="4" :value="loading">
        <v-progress-linear
          absolute
          indeterminate
          top
          color="primary"
          height="6"
        ></v-progress-linear>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',

  props: {
    value: Boolean,
    fullscreen: Boolean,
    hideOverlay: Boolean,
    persistent: Boolean,
    title: String,
    loading: Boolean,
    disabledClose: Boolean,
    dark: Boolean,
    color: String,
    scrollable: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 600
    }
  },

  watch: {
    value(val) {
      if (!val) document.getElementsByClassName('v-dialog--active')[0].scrollTop = 0
    }
  },

  computed: {
    transition() {
      return this.fullscreen ? 'dialog-bottom-transition' : 'dialog-transition'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-overlay__content {
    width: 100%;
    height: 100%;
  }
}
</style>
