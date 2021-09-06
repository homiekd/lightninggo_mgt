<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :rules="rules"
    :vid="vid"
    :mode="validMode"
  >
    <v-select
      no-data-text="無資料可供選擇"
      :readonly="readonly"
      :counter="counter"
      :error="error"
      :error-messages="errors"
      :hide-details="hideDetails"
      :item-text="itemText"
      :item-value="itemValue"
      :item-disabled="itemDisabled"
      :return-object="returnObject"
      :disabled="disabled"
      :loading="loading"
      :dense="isDense"
      :outlined="outlined"
      :items="items"
      :placeholder="placeholder"
      :multiple="multiple"
      :label="label"
      :append-icon="appendIcon"
      :prepend-inner-icon="prependInnerIcon"
      :value="selected"
      :prefix="prefix"
      :suffix="suffix"
      :filled="filled"
      @change="$emit('change', $event)"
    >
      <template #append-outer>
        <slot name="append-outer"></slot>
      </template>
    </v-select>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'BaseSelect',

  model: {
    prop: 'selected',
    event: 'change'
  },

  props: {
    name: String,
    rules: String,
    vid: String,
    error: Boolean,
    validMode: String,
    counter: [Number, String],
    selected: [String, Number, Array, Object, Boolean],
    multiple: Boolean,
    label: String,
    disabled: Boolean,
    loading: Boolean,
    items: Array,
    outlined: Boolean,
    prefix: String,
    suffix: String,
    filled: Boolean,
    returnObject: Boolean,
    itemText: [String, Array, Function],
    itemValue: [String, Array, Function],
    itemDisabled: [String, Array, Function],
    placeholder: String,
    dense: Boolean,
    hideDetails: [Boolean, String],
    prependInnerIcon: String,
    appendIcon: String,
    readonly: Boolean
  },

  computed: {
    isDense() {
      return this.outlined || this.filled || this.dense
    }
  }
}
</script>
