<template>
  <v-dialog
    class="VyDialogLoader"
    :value="loading"
    hide-overlay
    persistent
    :width="width"
  >
    <v-card color="primary" dark class="hover:pb-2">
      <v-card-title>
        {{ text }}
        <v-progress-linear indeterminate color="white" class="my-2" />
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "VyDialogLoader",
  props: {
    loading: { required: true, type: Boolean, default: false },
    text: { required: false, type: String, default: "Espere un momento, por favor" },
    width: { required: false, type: String, default: "400" },
  },
};
</script>
radius-4xl