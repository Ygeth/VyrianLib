<template>
  <div class="VyTabs" >
    <v-tabs class="vyTabsTitle" grow v-model="selectedTab">
      <v-tab v-for="(tab, index) in listaTabs" :key="index">
        {{tab.name}}
      </v-tab>
    </v-tabs>

    <!-- Tab Contenido -->
    <v-tabs-items v-model="selectedTab">
      <v-tab-item v-for="(tab, indexTab) in listaTabs" :key="indexTab">
        <div v-if="tab.component" class="tabItemContent">
          <keep-alive>
            <component :is="tab.component"/>
          </keep-alive>
        </div>
        <div v-else >
          <slot :name="`tab${indexTab + 1}`">
            Slot with name: {{ `tab${indexTab + 1}` }}
          </slot>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <slot name="actions"/>
  </div>
</template>

<script>
/**
  listaTabs:[{ 
    name: "Mantenimiento de centro",
    component: () => import('@/components/sections/gestionAvanzada/gestionCentro/gestionCentro.vue'),
  }],
 */
//* Events: 
export default {
  name: "VyTabs",
  props: {
    listaTabs: {required: true, type: Array, default: () => []} //{name, <OptionalComponent>}
  },

  data: () => ({
    selectedTab: null
  }),
  watch:{
    selectedTab(){
      this.$emit('change:tab', this.listaTabs[this.selectedTab])      
    }
  }



}
</script>

<style>

</style>