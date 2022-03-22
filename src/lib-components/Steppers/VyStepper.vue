<template>
  <v-stepper 
    v-model="currentStep"
    class="button-rounded"
    v-bind="$attrs"
  >
    <!-- Header -->
    <v-stepper-header class="">
      <template v-for="(step, index) in stepList">
        <v-stepper-step
          class="cursor-pointer"
          :key="index"
          :step="index + 1"
          :complete="step.valid"
          :rules="[() => !step.visited || (step.visited && step.valid)]"
          error-icon="$vuetify.icons.cancel"
          @click="eventClickStep(step, index)"
        >
          {{ step.label }}
          <small v-if="step.optionalLabel">{{ $t(step.optionalLabel) }}</small>
        </v-stepper-step>

        <v-divider
          :key="`divider${index}`"
          v-if="index < stepList.length - 1"
        />
      </template>
    </v-stepper-header>

    <template v-for="(step, indexStep) in stepList">
      <v-stepper-content :key="indexStep" :step="indexStep + 1" class="pa-0">
        <component class="pa-4"
          v-if="step.component"
          :is="step.component"
          :data="step.data"
        />
        <div v-else class="pa-4">
          <slot :name="`step${indexStep + 1}`">
            Slot with name: {{ `step${indexStep + 1}` }}
          </slot>
        </div>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
/** * stepList: [{
    id: 1,
    label: this.$t('forms.information'),
    valid: false,
    visited: false
  }]

** Events: @currentStep(currentStep)
*/
export default {
  name: "VyStepper",
  props: {
    // * Example: { label: "stepLabel", valid: false, visited: false } */
    stepList: { required: true, type: Array, default: new Array() },
    allowForward: { required: false, type: Boolean, default: false }
  },
  innheritAttrs: false,

  data: () => ({
    currentStep: 1,
  }),


  methods: {
    nextStep() {
      if (this.currentStep < this.stepList.length) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    eventClickStep(step, index) {
      if (this.allowForward || step.visited || this.currentStep > index) {
        this.currentStep = index + 1;
      }
    },
  },

  
  watch: {
    currentStep() {
      this.$emit("currentStep", this.currentStep);
    },
  },
};
</script>

<style>
</style>