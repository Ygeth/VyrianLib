<template>
  <div class="VyModal">
    <v-dialog      
      :value="show"
      v-bind="$attrs" 
      :width="width"
      @click:outside="$emit('close')"
      @keydown.esc="$emit('close')"
    >

    <v-card class="VyModal">
      <div class="TitleModal flex justify-between" :class="stickyTitleStyle">
        <slot name="title">
          <v-card-title v-if="showTitle" class="">
            {{title}}
          </v-card-title>
        </slot>

        <v-card-title v-if="closable">
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>
      <v-card-text>
        <slot name="body"/>
      </v-card-text>

      <slot name="footer"/>
    </v-card>  

  </v-dialog>
  </div>
</template>

<script>
export default {
  name: "VyModal",
  props: {
    show: {required: true, type: Boolean, default: false},
    title: {required: false, type: String, default: null},
    showTitle: {required: false, type: Boolean, default: true},
    stickyTitle: {required: false, type: Boolean, default: false},
    closable: {required: false, type: Boolean, default: true},
    width: {required: false, type: [String, Number], default: 500}
  },
  inheritAttrs: false,

  computed: {
    stickyTitleStyle(){
      return this.stickyTitle ? 'sticky top-0 bg-white elevation-2' : ''
    }

  },
  beforeDestroy(){
    this.$emit('close')
  }
}
</script>
