<template>
  <base-card :title="title" prepend-icon="fa-filter" collapse>
    <slot></slot>
    <template #title-append>
      <slot name="title-append"></slot>
    </template>

    <div class="d-flex justify-end align-center py-1">
      <slot name="footer">
        <v-btn
          v-if="enabledSearch"
          outlined
          color="primary"
          @click="$emit('search')"
        >
          查詢
        </v-btn>
      </slot>
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'BaseSearchbar',

  props: {
    title: {
      type: String,
      default: '搜尋'
    },
    enabledSearch: {
      type: Boolean,
      default: true
    }
  }
}
</script>
