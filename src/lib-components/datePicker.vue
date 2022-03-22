<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs: menuAttrs }">
        <v-text-field
          :label="label"
          class=""
          :value="fechaDisplay"
          :rules="mandatory ? [validation.required, validation.fecha] : [validation.fecha]"
          :hint="hint"
          :prepend-inner-icon="outlined ? 'mdi-calendar': null"
          :prepend-icon="outlined ? null : 'mdi-calendar'"
          v-bind="{...componentAttrs, ...menuAttrs}"
          v-on="on"
          :outlined="outlined"
          readonly
          @click:clear="eventClear"
          @click="eventDatePicker"
        ></v-text-field>
      </template>
      <v-date-picker
        scrollable
        no-title
        ref="pickerFecha"
        v-model="date"
        v-bind="componentAttrs"
        :show-current="currentDate"
        locale="es-ES"
        :first-day-of-week="1"
        @input="eventInputFecha"
        @change="eventChangeFecha"
      />
        <!-- :allowed-dates="allowedDates" -->
    </v-menu>
  </div>
</template>
<script>
import {
  formatDate,
  calcularEdad,
  dateToDDMMYYYY,  
  dateToVuetify,//YYYY-MM-DD
} from "../utils/date-utils.js";

export default {
  name: "DatePicker",

  props: { //Todas las props de v-date-picker o v-text-field son validas
    value: { required: true },
    mandatory: { required: false, type: Boolean, default: false },
    outlined: { required: false, type: Boolean, default: true },
    label: { required: false, type: String, default: "Fecha" },
    hint: { required: false, type: String, default: "Por favor, seleccione una fecha" },
    birthdate: { required: false, type: Boolean, default: false },
  },

  data () {
    return {
      model: {
        fecha: null, // fecha en formato Date de JS
      },
      date: null,   // fecha en formato YYYY-MM-DD
      menu: null,   // flag para mostrar/ocultar el popup con el calendario

      validation: {
        required: value => !!value || "Es necesario completar este campo",
        fecha: value => {
          if (value == null) {
            return true;
          }
          const pattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
          return pattern.test(value) || "Fecha inválida";
        }
      }
    }
  },

  computed: {
    componentAttrs() {
      const { ...attrs } = this.$attrs;
      return attrs;
    },

    fechaDisplay() {
      return formatDate(this.date);
    },

    currentDate() {
      return this.birthdate ? "2000-01-01" : true;
    }
  },

  methods: {
    eventInputFecha(event) {
      this.model.fecha = new Date(event);
    },

    eventChangeFecha(event) {
      this.$refs.menu.save(this.date);
    },

    eventDatePicker() {
      setTimeout(() =>
        this.birthdate ? (this.$refs.pickerFecha.activePicker = "YEAR") : null
      );
    },

    clear() {
      this.date = null;
      this.menu = null;
      this.$emit('clear');
    },

    eventClear() {
      this.model.fecha = null;
      this.clear();
    },

    readValue() {
      this.model.fecha = this.value;

      this.date = dateToVuetify(this.value);
    },

    transformedValues(){
      return {
        ddMMYYYY: dateToDDMMYYYY(this.model.fecha),
        yyyyMMDD: dateToVuetify(this.model.fecha)
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
      if (this.value != null && this.model.fecha != null) {
        if(new Date(this.value).toISOString() != new Date(this.model.fecha).toISOString()) {
          this.readValue();
        }
      } else {
        this.readValue();
      }
    },

    // Events Watcher
    "model.fecha"(value) {
      this.$emit("input", value);
      this.$emit("change", value);
      this.$emit("transformedValues", this.transformedValues());
      if (this.birthdate) {
        this.$emit("edad", calcularEdad(value));
      }
    }
  }
};
</script>