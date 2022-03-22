<template>
  <div>
    <div class="d-flex" v-for="item in listaItems" :key="item.id">
      <BotoneraInline 
        :nombreItem="item.nombre"
        @edit="() => item.disabled = false"
        @save="() => eventSave(item)"
        @discard="() => eventDiscard(item.id)"
        @delete="() => eventDelete(item.id)"
      />
        <!-- :creationMode="false" -->
        <!-- :disabled="false" -->
        <!-- :showDelete="false" -->
      <v-text-field label="Nombre" 
        v-model="item.nombre" 
        :disabled="item.disabled"
      />
      
    </div>
  </div> 
</template>

<script>
export default {
  name: "BotoneraExample",
  data: () => ({
    listaItems: [
      {
        id: 1,
        nombre: "patatas",
        disabled: true
      },
      {
        id: 2,
        nombre: "cebollas",
        disabled: true
      },
      {
        id: 3,
        nombre: "renacuajos",
        disabled: true
      },
      {
        id: 4,
        nombre: "llaves irascibles",
        disabled: true
      },
      {
        id: 5,
        nombre: "contenedores existenciales",
        disabled: true
      }
    ],
    listaItemsOld:[
      {
        id: 1,
        nombre: "patatas",
        disabled: true
      },
      {
        id: 2,
        nombre: "cebollas",
        disabled: true
      },
      {
        id: 3,
        nombre: "renacuajos",
        disabled: true
      },
      {
        id: 4,
        nombre: "llaves irascibles",
        disabled: true
      },
      {
        id: 5,
        nombre: "contenedores existenciales",
        disabled: true
      }
    ],
  }),
  methods:{
    eventSave(itemSave){
      itemSave.disabled = true;
      const index = this.listaItems.findIndex(item => item.id == itemSave.id)
      
      this.listaItems.splice(index, 1, itemSave);
      this.listaItemsOld.splice(index, 1, itemSave);
      
    },

    eventDiscard(itemId){
      const index = this.listaItems.findIndex(item => item.id == itemId)

      this.listaItems[index].nombre = this.listaItemsOld[index].nombre;
      this.listaItems[index].disabled = true;
    },

    eventDelete(itemId){
      this.listaItems.splice(this.listaItems.findIndex(item => item.id == itemId), 1)
      this.listaItemsOld.splice(this.listaItems.findIndex(item => item.id == itemId), 1)
    }
  }

}
</script>

<style>

</style>