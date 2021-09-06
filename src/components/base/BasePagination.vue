<template>
  <div class="pagination">
    <v-row
      dense
      justify="center"
      justify-lg="end"
      justify-xl="start"
    >
      <v-col cols="12" xl="9" class="d-flex justify-center justify-lg-end">
        <v-pagination
          :length="totalPage"
          :total-visible="totalVisible"
          :value="value"
          @input="$emit('change', $event)"
        ></v-pagination>
      </v-col>

      <v-col
        cols="4"
        md="2"
        xl="1"
        order-lg="2"
        order-xl="0"
      >
        <v-select
          label="每頁顯示"
          dense
          outlined
          hide-details
          :items="options"
          :value="pageSize"
          @change="sizeOnChange"
        ></v-select>
      </v-col>

      <v-col
        cols="4"
        md="2"
        xl="1"
        order-lg="3"
        order-xl="0"
      >
        <v-text-field
          v-model="jumpPage"
          label="跳頁至"
          dense
          outlined
          type="number"
          hide-details
          @blur="jumpOnBlur"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        lg="2"
        xl="1"
        order-lg="1"
        order-xl="0"
      >
        <div class="d-flex justify-center align-center fill-height">
          <span class="mx-2">
            共
            <span class="red--text">{{ totalPage }}</span>
            頁 /
            <span class="red--text">{{ pageCount }}</span>
            筆
          </span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: Number,
    pageSize: Number,
    pageCount: Number,
    visibleLength: Number
  },

  data: () => ({
    options: [10, 50, 100],
    jumpPage: null
  }),

  computed: {
    // [ 計算頁數 ]
    totalPage () {
      if (this.pageCount <= this.pageSize) return 1
      return Math.ceil(this.pageCount / this.pageSize)
    },

    // [ 分頁按鈕最多顯示數量 ]
    totalVisible () {
      if (this.visibleLength) return this.visibleLength

      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 5
        case 'sm':
          return 5
        case 'md':
          return 8
        case 'lg':
          return 8
        case 'xl':
          return 10
        default:
          return 10
      }
    }
  },

  methods: {
    // [ 更換每頁顯示總筆數 ]
    sizeOnChange (value) {
      this.jumpPage = null
      this.$emit('update:page-size', value)
      this.$emit('change', 1)
    },

    // [ 跳頁 onBlur ]
    jumpOnBlur () {
      if (this.jumpPage === null) return
      if (this.jumpPage > this.totalPage) this.jumpPage = this.totalPage
      if (this.jumpPage < 1) this.jumpPage = 1
      this.$emit('change', this.jumpPage * 1)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-pagination__item {
  outline: 0;
}
</style>
