<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :rules="rules"
    :vid="vid"
    :mode="validMode"
  >
    <v-text-field
      :loading="loading"
      :counter="counter"
      :error-messages="errors"
      :hide-details="hideDetails"
      :clearable="clearable"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :dense="isDense"
      :outlined="outlined"
      :append-icon="appendIcon"
      :label="label"
      :value="value"
      :type="type"
      :prefix="prefix"
      :suffix="suffix"
      :filled="filled"
      :prepend-inner-icon="prependInnerIcon"
      @click:prepend-inner="$emit('click:prepend-inner', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
      @click:append="$emit('click:append', $event)"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    loading: Boolean,
    name: {
      type: String,
      default: ''
    },
    rules: [String, Object],
    vid: String,
    validMode: String,
    counter: [Number, String],
    label: String,
    value: [String, Number],
    type: String,
    outlined: Boolean,
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    prependInnerIcon: String,
    appendIcon: String,
    dense: Boolean,
    hideDetails: [Boolean, String],
    prefix: String,
    suffix: String,
    filled: Boolean
  },

  computed: {
    isDense () {
      return this.outlined || this.filled || this.dense
    }
  }
}
</script>
