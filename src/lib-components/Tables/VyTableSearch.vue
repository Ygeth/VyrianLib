<template>
  <v-card>
    <v-card-title primary-title>
      <slot name="search">
        <v-row>
          <v-col cols="6" lg="4">
            <div class="d-flex">
              <component v-if="searchComponent" :is="searchComponent.name"
                v-bind="searchComponent.props"
                @change="(search) => $emit('search', search)"
              />
              <slot name="searchAction"/>
            </div>
          </v-col>
          <v-col cols="6">
              <slot name="topRight"/>
          </v-col>
        </v-row>
      </slot>
    </v-card-title>
    <v-card-text>
      <!-- Default slot -->
      <slot/>

      <!-- TableHeader -->
      <slot name="tableHeader"/>

      <!-- Table -->
      <VyTable v-on="$listeners" v-bind="tableProps">
        <!-- Slots de VyTable (y vuetify) propagados-->
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope"/>
        </template>        
      </VyTable>
    </v-card-text>

  </v-card>
</template>

<script>
import VyTable from "./VyTable"
export default {
  name: "VyTableSearch",
  props: {
    searchBySelect: {required: false, type: Boolean, default : false},
    searchByText: {required: false, type: Boolean, default : false},
    searchItems: {required: false, type: Array, default: () => []},
    searchLabel: {required: false, type: String, default: "Buscador"},
    ...VyTable.props
  },
  // inheritAttrs: false,

  data: () => ({
    search: null
  }),
  
  computed: {
    searchComponent(){
      let component = null;

      if(this.searchBySelect){
        component = this.autocompleteSearch;
      } else if(this.searchByText){
        component = this.textSearch;
      }

      return component
    },

    autocompleteSearch(){
      return {
        name: "v-autocomplete",
        props: {        
          label: this.searchLabel,
          items: this.searchItems,
          "item-text": "nombre",
          "return-object": true,
          "hide-details": true,
          "auto-select-first": true,
          "no-data-text": "No hay ningun dato",
          outlined: true,
        }
      }
    },

    textSearch(){
      return {
        label: this.searchLabel,
        name: "v-text-field",
        props: {
          "hide-details": true,
          outlined: true,
          "append-icon": "mdi-magnify"
        }
      }
    },

    tableProps(){
      // Extrae solo las propiedades de VyTable
      let auxProps = Object.entries(this.$props).filter((propiedad) => Object.keys(VyTable.props).includes(propiedad[0]))

      return Object.fromEntries(auxProps)
    }
  },

  
  components: {
    VyTable
  }
}
</script>

<style>

</style>