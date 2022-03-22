import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#124D91', //Azul umivale
        secondary: {
          base: '#FF6100', //Naranja umivale
        },
        background: {
          base: "#f5f5f5", //Oscuro
          dark: "#424242", //Oscuro
        },
        success: {
          base: '#1c8523',
        },
        error:{
          base: '#D92727'
        },
        umivalesecondary: '#B9CADD', 
        anchor: '#1976d2', 
        umivaletitle: '#124D91', //Azul Umivale
        
        textInverted: "#f0f0f0",
      
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
});
