
<template>
  <v-app>
    <VyPageLoader :loading="loadingPage" class="ma-8">
      
      <!-- Botonera + transition -->
      <div>
        <v-btn class="my-4" color="primary" @click="mostrarLista = !mostrarLista" style="display:block">
          Mostrar/ocultar lista con Botonera
        </v-btn>
        <TransitionHeight>
          <div v-if="mostrarLista">
            A que mola la transicion  
            <BotoneraInlineExample />
          </div>
        </TransitionHeight>
      </div>

      <!-- Loader -->
      <div>
        <v-btn color="primary" @click="loadData()">
          Loader que cargar algun tipo de datos
        </v-btn>
        <VyDialogLoader :loading="loading" text="No se que esta pasando, la verdad"/>
      </div>

      <!-- DatePicker & TimePicker -->
      <div style="width: 24rem" class="my-8">
        DatePicker:
        <DatePicker class="mb-4" label="Hoy es" 
          v-model="fecha"
          outlined
          :clearable="true" 
        />

        TimePicker:
        <TimePicker class="mb-8" label="Horilla" 
          v-model="hora"
          outlined
          :clearable="true" 
        />
      </div>

      <!-- Icono -->
      <div class="my-8">
        Icono:
      </div>

      <!-- Visaor PDF -->
      <div class="my-4">
        PDF Viewer:
        <PdfViewer :value="pdf.dataURI" valueFormat="dataURI"/>
      </div>

    </VyPageLoader>
  </v-app>
</template>


<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { VyrianSample } from '@/entry.esm'; 
import pdf from "@/assets/pdfData.json"

export default Vue.extend({
  name: 'ServeDev',
  data: () => ({
    mostrarLista: false,
    loading: false,
    loadingPage: true,
    fecha: null,
    hora:null,
    pdf

  }),

  computed: {
  } ,

  methods: {
    loadData(){
      this.loading=true; 
      setTimeout(() => this.loading=false, 4000)
    }
  },

  mounted(){
    setTimeout(() => this.loadingPage=false, 2000)
  }
  // components: {
  //  VyrianSample,
  // }
});
</script>
<style >
.pdfViewer .viewer{
  box-shadow: 4px 5px 10px -2px rgba(0,0,0,0.53);
}
</style>
