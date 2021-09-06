<template>
  <v-data-table
    hide-default-footer
    no-data-text="沒有數據可以顯示"
    loading-text="數據下載中，請稍後"
    disable-sort
    disable-pagination
    :item-class="itemClass"
    :loading="loading"
    :show-select="showSelect"
    :headers="headers"
    :items="items"
    :item-key="itemKey"
    :value="value"
    :show-expand="showExpand"
    :single-expand="singleExpand"
    :mobile-breakpoint="mobileBreakpoint"
    :expanded="expanded"
    @input="$emit('input', $event)"
    @update:expanded="$emit('update:expanded', $event)"
  >
    <template #top>
      <div v-if="$scopedSlots.top" class="pb-2">
        <slot name="top"></slot>
      </div>
    </template>

    <template #expanded-item="{ headers, item }">
      <slot name="expanded-item" :item="item" :headers="headers"></slot>
    </template>

    <template v-for="(item, index) in headersMap" #[item.headerSlot]="{ header }">
      <span v-if="!header.customizedHeader" :key="index">{{ header.text }}</span>
      <slot v-else :name="`header_${header.value}`" :item="header"></slot>
    </template>

    <template v-for="(header, idx) in headersMap" #[header.slot]="{ item, index }">
      <span v-if="!header.customized" :key="idx">
        {{ formatter(header.value, item[header.value], item) }}
      </span>

      <slot
        v-else
        :name="header.value"
        :item="item"
        :index="index"
        :header="header"
      ></slot>
    </template>

    <template #footer>
      <div v-if="$scopedSlots.footer" class="mt-6">
        <slot name="footer"></slot>
      </div>
      <!-- 讀取狀態時的覆蓋遮罩 -->
      <v-overlay absolute z-index="4" :value="loading"></v-overlay>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'BaseTable',

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    formatter: {
      type: Function,
      default: (cell, value, row) => {
        return value
      }
    },
    itemClass: Function,
    showSelect: Boolean,
    expanded: Array,
    showExpand: Boolean,
    singleExpand: Boolean,
    loading: Boolean,
    value: Array,
    itemKey: String,

    mobileBreakpoint: [String, Number]
  },

  computed: {
    // [ 遍歷表頭 ]
    headersMap () {
      return this.headers.map(item => {
        return {
          ...item,
          slot: `item.${item.value}`,
          headerSlot: `header.${item.value}`,
          value: item.value,
          customized: item.customized || false
        }
      })
    },

    // [ 分頁插槽寬度控制 ]
    paginationSlot () {
      return {
        width: this.$vuetify.breakpoint.mdAndUp ? '50%' : '100%'
      }
    }
  }
}
</script>
