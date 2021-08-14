<template>
  <v-menu offset-y :close-on-content-click="closeOnContentClick">
    <!-- 觸發按鈕 -->
    <template #activator="{ on }">
      <slot name="trigger" :on="on"></slot>
    </template>

    <!-- 選單卡片 -->
    <v-card :width="width">
      <v-card-text :class="cardTextColor" class="d-flex justify-center align-center">
        <span v-text="title"></span>
        <slot name="append-icon"></slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text :class="cardTextColor">
        <slot name="content"></slot>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'BaseHeaderMenu',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Untitled'
    },
    width: {
      type: [String, Number],
      required: false,
      default: '300px'
    },
    closeOnContentClick: Boolean
  },

  computed: {
    cardTextColor () {
      return this.$vuetify.theme.dark ? 'white--text' : 'black--text'
    }
  }
}
</script>
