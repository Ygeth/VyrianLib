import Vue from 'vue';
import Dev from './serve.vue';
import vuetify from '@/plugins/vuetify' // path to vuetify export

// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import Vyrian from '@/entry.esm';
import VyrianExamples from '@/examplesEntry.esm';

Vue.use(Vyrian);
Vue.use(VyrianExamples);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(Dev),
}).$mount('#app');
