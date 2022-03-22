<template>
  <div class="VyMenuActions flex-col-center">
    <v-menu offset-y v-if="visibleActions.length > 0">
      <template #activator="{ on, attrs }">
        <v-icon v-on="on" v-bind="attrs" class="ml-2">mdi-dots-vertical</v-icon>
      </template>
      <v-list >
        <v-list-item v-for="(action, index) in visibleActions" :key="index"
          @click="$emit(action.event)"
        >
          <v-icon v-if="action.icon" class="mr-2">{{action.icon}}</v-icon>
          <v-list-item-title>{{action.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "VyMenuActions",
  props: {
    /** Estructura de las acciones que se pueden pasar por prop
      actions: [{
        title: 'Eliminar',
        icon: 'mdi-delete',
        event: 'delete',
        show: true
      }]
    */
    actions: {required: false, type: Array, default: () => []}
  },

  data: () => ({
    
  }),
  
  computed: {
    visibleActions(){
      return this.actions.filter(action => action.show !== false)
    }    
  },
  
  methods: {
  
  },

}
</script>

<style>

</style>