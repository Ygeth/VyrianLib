<template>
  <v-btn
    class="vyBtn"
    v-bind="$attrs"
    v-on="$listeners"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" class="mr-2">
      {{icon}}
    </v-icon>
    {{texto}}
  </v-btn>
</template>

<script>
export default {
  name: "VyBtn",
  props: {
    icon:  {required: false, type: String, default: null}
  },
  inheritAttrs: false,
}
</script>

<style>
</style>