<template>
  <v-tooltip :disabled="disabled" bottom open-delay="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon  v-bind="attrs" v-on="on" 
        @click="$emit('click')"
        :color="color"
        :disabled="disabled"
      >
        {{icon}}
      </v-icon>
    </template>
    <slot>
      <span>{{label}}</span>
    </slot>
  </v-tooltip>
</template>

<script>
export default {
  name: "VyIconTooltip",
  props: {
    label: {required: false, type: String, default: null},
    icon: {required: false, type: String, default: 'mdi-sparkles'},
    color: {required: false, type: String, default: 'primary', validator: (value) => ['primary', 'secondaty'].includes(value)},
    disabled: {required: false, type: Boolean, default: false}
  },
  inheritAttrs: false
}
</script>

<style>

</style>