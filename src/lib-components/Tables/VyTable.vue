<template>
   <div class="VyTable">
    <v-data-table
      v-bind="$attrs"
      :headers="headers"
      fixed-header  
      :items="data.lista"
      :server-items-length="data.total"     
      :height="computedHeight"
      :disable-pagination="disablePagination"
      :hide-default-footer="disablePagination"
      
      :options="options"
      :footer-props="{
        itemsPerPageText: 'Filas por página',
        itemsPerPageOptions: [30, 50, 100, 200],
        showFirstLastPage: true,
        showCurrentPage: true,
      }"
      @click:row="event => $emit('click:row', event)"
      @input="event => $emit('input', event)"      
      loading-text="Cargando, espere por favor..."
      no-data-text="No hay datos para mostrar"
      @update:options="event => onUpdatePage(event)"
    >
      <!-- hide-default-footer -->
      <!-- Slot Agrupacion por tipo -->
      <template v-if="agrupacion && agrupacion.tipo == 'date'" 
        v-slot:group.header="{ group, items, isOpen, toggle }"
      >
        <th colspan="100%">
          <v-btn text icon medium @click="toggle">
            <v-icon>{{ isOpen ? "mdi-minus" : "mdi-plus" }}</v-icon>
          </v-btn>
          <span class="subtitle-1"><b>{{ group }} </b></span>
        </th>
      </template>

      <!-- Formatea las columnas por tipo de dato | necesario propiedad 'dataType = (text | number | date | boolean)' -->
      <template
              v-for="(header, key) in headers.filter((header) => header.hasOwnProperty('dataType'))"
              v-slot:[`item.${header.value}`]="{ value }"            
            >
            <div :key="key" :class="['column-'+ header.dataType]">{{ value }}</div>        
      </template>

      <!-- Slots de vuetify propagados de manera transparente -->
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>

      <!-- Columna de Acciones -->
      <template v-if="showCustomActions" v-slot:item.actions="{ item }">
        <!-- Edit -->
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="$emit('edit', item)" v-bind="attrs" v-on="on" class="ml-2">mdi-pencil</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        
        <!-- Delete -->
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="$emit('delete', item)" v-bind="attrs" v-on="on" class="ml-2">mdi-delete</v-icon>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </template>
    </v-data-table>
    
    <slot name="rowsAppend"/>
  </div>
</template>

<script>

export default {
  name: "VyTable",
  props: {
    headers: { required: false, type: Array, default: () => []}, //[{ text: "Lista de miembros", value: "nombre", sortable: false }],
    agrupacion: {required: false, type: Object, default: () => null}, //{campo, tipo},
    options: {required: false, type: Object, default: () => ({ page: 1, pageCount: 1, itemsPerPage: 30})},
    disablePagination: {required: false, type: Boolean, default: false},
    height: {required: false, type: String, default: () => "80vh" },
    data: { required: false, type: Object, default: () => ({lista:[], total: -1}) }, // total = -1 paginación en el servidor desactivada
  },
  inheritAttrs: false,


  data(){
    return {
    }
  },

  computed: {
    /** Muestra las acciones Editar y Eliminar
     * para mostrarlo, añadir a la propiedad headers:
     * headers = [{value: "actions", showCustomActions: true ,}]
    */ 
    showCustomActions(){
      let auxActions = this.headers.find(header => header.value == 'actions')
      return auxActions ? 
        auxActions.showCustomActions != undefined ? auxActions.showCustomActions : true : auxActions
    },

    /** 
     * Calcula el height de la tabla teniendo en cuenta si hay paginación o no
    */
    computedHeight(){
      return this.disablePagination ? "100%" : this.height;
    }
  },

  watch: {    
  },

  methods: {
    //#region Agrupacion de filas
    customGroup(items, groupBy){
      if(Object.keys(this.agrupacion).length > 0){
        const groups = items.reduce((accum, currentItem) => {
          const group = this.typeGroup(currentItem[groupBy]);
          (accum[group] = accum[group] || []).push(currentItem);
          return accum;
        }, {});

        return Object.keys(groups).map(key => ({
          name: key,
          items: groups[key]
        }));
      } else {
        return null
      }
    },

    typeGroup(item){
      let tiposAgrupacion= {
        date: this.dateToDDMMYYYY(item)
      }

      return tiposAgrupacion[item] || item
    },

    dateToDDMMYYYY(date) {
      let aux = new Date(date);

      const day = aux.getDate() < 10 ? `0${aux.getDate()}` : aux.getDate();
      const month = aux.getMonth() + 1 < 10 ? `0${aux.getMonth() + 1}`: aux.getMonth() + 1;
      return `${day}/${month}/${aux.getFullYear()}`;
    },
    //#endregion Fin agrupacion


    /**
    * #update:options table event 
    * Recupera el evento de la tabla y lanza al padre
    * un evento con los parametros de paginación del back
    */
    onUpdatePage(options = {}){
      const paginationParams = {
        page: options.page,
        itemsPerPage: options.itemsPerPage
      }
      this.$emit('change:page', paginationParams)
    },
  }
}
</script>

<style lang="scss">
.VyTable{
  // .v-data-table-header th{
  //  background-color: var(--v-background-base) !important;
  // }

  .v-data-table__wrapper{
    border-radius: 4px 4px 0 0;
  }
  .column-text{
    text-align: left;
  }
  .column-number{
    text-align: right;
  }
  .column-date,
  .column-boolean{
    text-align: center;
  }
}



</style>