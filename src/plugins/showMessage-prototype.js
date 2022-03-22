import vuetify from './vuetify'
import Vue from 'vue';

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

// Esto es un wrapper que utiliza VuetifyDialog
Vue.prototype.$showMessage = {
  success: (message, timeout=3000) => Vue.prototype.$dialog.message.success(message, {position: "top-right", color: "success", timeout: timeout }),
  info: (message, timeout=3000) => Vue.prototype.$dialog.message.info(message, {position: "top-right", color: "primary", timeout: timeout }),
  error: (message, timeout=5000) => Vue.prototype.$dialog.message.error(message, {position: "top-right", color: "error", timeout: timeout }),
  warning: (message, timeout=3000) => Vue.prototype.$dialog.message.warning(message, {position: "top-right", color: "warning", timeout: timeout }),
  confirm: (title, text, textAccept='Aceptar') => Vue.prototype.$dialog.info({text, title, color: "primary", actions: [{text: textAccept, color: 'secondary', key:true}]})
}