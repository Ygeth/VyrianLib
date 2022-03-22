<template>
  <div>

    <v-menu
      class="TimePicker"
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="hora"
      transition="scale-transition"
      offset-y
      v-bind="componentAttrs"

      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs: menuAttrs }">
        <v-text-field
          v-model="hora"
          :label="label"
          :rules="mandatory ? [validation.required, validation.hora] : [validation.hora]"
          :outlined="outlined"
          :prepend-inner-icon="outlined ? 'mdi-clock-time-four-outline': null"
          :prepend-icon="outlined ? null : 'mdi-clock-time-four-outline'"
          readonly
          v-bind="{...componentAttrs, ...menuAttrs}"
          v-on="on"
        />
      </template>
      <v-time-picker
        v-if="menu"
        v-model="hora"
        v-bind="componentAttrs"
        format="24hr"
        full-width
        :allowed-minutes="(m) => m % 5 === 0"
        @click:minute="$refs.menu.save(hora)"
      />
    </v-menu>
  </div>
</template>
<script>
import {
  dateToDDMMYYYY,  
  dateToVuetify,//YYYY-MM-DD
} from "../utils/date-utils.js";

export default {
  name: "TimePicker",

  props: { //Todas las props de v-date-picker son validas
    value: { required: true },
    label: { required: false, type: String, default: "Hora" },
    mandatory: { required: false, type: Boolean, default: false },
    outlined: { required: false, type: Boolean, default: true }
  },

  data () {
    return {
      model: {
        hora: null, // fecha en formato Date de JS
      },
      hora: null,
      menu: null,   // flag para mostrar/ocultar el popup con el calendario

      validation: {
        required: value => !!value || "Es necesario completar este campo",
        hora: value => {
          if (value == null) {
            return true;
          }
          const pattern = /^(?:([01]?\d|2[0-3]):([0-5]?\d))?$/;
          return pattern.test(value) || "Hora inválida";
        }
      }
    }
  },

  computed: {
    componentAttrs() {
      const { ...attrs } = this.$attrs;
      return attrs;
    },
  },

  methods: {
    readValue() {
      this.model.hora = this.value;
      
      if(this.value != null){

        let auxTime = new Date(this.value);
        const hour = auxTime.getHours() < 10 ? `0${auxTime.getHours()}` : auxTime.getHours();
        const min = auxTime.getMinutes() < 10 ? `0${auxTime.getMinutes()}`: auxTime.getMinutes();

        this.hora = `${hour}:${min}`;
      }
    },

    transformedValues(){
      return {
        ddMMYYYY: dateToDDMMYYYY(this.model.hora),
        yyyyMMDD: dateToVuetify(this.model.hora)
      }
    }
  },

  mounted() {
    if(this.value != null) {
      this.readValue();
    }    
  },

  watch: {
    // Props Watcher
    value() {
      if (this.value != null && this.model.hora != null) {
        if(new Date(this.value).toISOString() != new Date(this.model.hora).toISOString()) {
          this.readValue();
        }
      } else {
        this.readValue();
      }
    },

    hora(){
      this.model.hora = new Date(this.model.hora).setHours(this.hora.split(':')[0],this.hora.split(':')[1])
    },

    // Events Watcher
    "model.hora"(value) {
      this.$emit("input", value);
      this.$emit("change", value);
      this.$emit("hora", this.hora);
      this.$emit("transformedValues", this.transformedValues());
    }
  }
};
</script>