<template>
  <div class="pageLoader">
    <div v-if="loading" class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="secondary"
        v-bind="$attrs"
        v-on="$listeners"
        :loading="loading"
      />
    </div>

    <!-- Main Slot -->
    <div v-show="!loading">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "pageLoader",
  props: {
    loading: { required: false, type: Boolean, default: false }
  },
  inheritAttrs: false
};
</script>

<style>
.pageLoader > .loader{
  position: fixed;
  top: 25%;
  left: 50%

}
</style>