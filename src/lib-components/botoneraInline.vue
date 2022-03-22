<template>
  <div class="ky-BotoneraInline">
    <div class="d-flex my-auto">
      <!-- Boton Editar/Guardar -->
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="eventEditionSave()"
            color="primary"
            v-bind="attrs"
            v-on="on"
            class="mr-2"
          >
            {{ model.disabled ? "mdi-pencil" : "mdi-content-save-outline" }}
          </v-icon>
        </template>
        <span>
          {{ labelEditSave }}
        </span>
      </v-tooltip>
      <!-- Boton Descartar -->
      <v-tooltip v-if="!model.disabled" bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="eventDiscard()"
            color="error"
            v-bind="attrs"
            v-on="on"
            class="mr-2"
          >
            mdi-close-circle
          </v-icon>
        </template>
        <span> Descartar cambios </span>
      </v-tooltip>
      <!-- Boton eliminar -->
      <v-tooltip v-if="!creationMode && showDelete" bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="$emit('delete')"
            v-bind="attrs"
            v-on="on"
            class="mr-2"
          >
            mdi-delete
          </v-icon>
        </template>
        <span> {{labelDelete}} </span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "ky-BotoneraInline",
  props:{
    disabled: {required: false, type: Boolean, default: true},
    creationMode: {required: false, type: Boolean, default: false},
    nombreItem: {required: false, type: String, default: null},
    showDelete: {required: false, type: Boolean, default: true},
  },
  data() {
    return {
      model: {
        disabled: this.disabled,
      }
    }
  },

  computed:{
    labelEditSave(){
      let aux = this.model.disabled ? 'Editar' : 'Guardar';
      aux += this.nombreItem ? ` ${this.nombreItem}` : '';
      return aux;
    },
    
    labelDelete(){
      let aux = 'Eliminar';
      return this.nombreItem ? `${aux} ${this.nombreItem}` : aux;
    }
  },

  methods:{
    eventEditionSave(){
      if(this.model.disabled){
        this.$emit('edit')
      } else{
        this.$emit('save')
      }
      this.model.disabled = !this.model.disabled;
    },
    eventDiscard(){
      this.model.disabled = !this.model.disabled;
      this.$emit('discard');
    },

    eventDelete(){
      this.$emit('delete');
    }
  },

  watch:{
    disabled(){
      this.model.disabled = this.disabled;
    }
  }
}
</script>

<style scoped>
.ky-BotoneraInline{
  display: flex;
  justify-content: center
}

</style>