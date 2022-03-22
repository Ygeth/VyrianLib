
// eslint-disable-next-line no-unused-vars
export default {
  data () {
    return {
      validationRules: {
        required: v => !!v || 'Es necesario completar este campo',
        requiredTime: v => !!v.time || 'Es necesario completar este campo',
        requiredBoolean: v => !(!v && v!==false) || 'Es necesario completar este campo',
        maxLength(v, maximum) { return (v || '').length <= maximum || 'El campo excede la longitud máxima permitida (' + maximum + ' caracteres)'; },
        length(v, length) { return (v || '').length == length || `El campo debe tener ${length} caracteres`; },
        rangeInt(v, minimum, maximum) { return ((v || '') >= minimum && (v || '') <= maximum) || 'El campo está fuera del rango permitido [ ' + minimum + ' - ' + maximum + ' ]'; },
        rangeNumber(v, minimum, maximum) { return !v || /^[1-9]\d*(,\d+)?$/.test(v) && ((parseFloat(v) || '') >= minimum && (parseFloat(v) || '') <= maximum) || 'El campo está fuera del rango permitido [ ' + minimum + ' - ' + maximum + ' ]'; },
        email: v => !v || /.+@.+\..+/.test(v) || 'No es un e-mail válido',
        dni: v =>  !v || this.validateDNI(v) || 'No es un DNI/NIE válido',
        cif: v => this.validateCIF(v) || 'No es un CIF válido',
        dniOrCif: v => this.validateDNI(v) || this.validateCIF(v) || 'No es un CIF válido',
        phone: v => !v || /^[0-9]{9}$/.test(v) || 'No es un teléfono válido',
        int: v => !v || /^[0-9]\d*$/.test(v) || 'Es necesario que sea un positivo sin decimales',
        date: {
          // format: 
          lt: (v, dateMax) =>  !v || this.dateLessThan(v, dateMax) || 'No puede ser mayor a la fecha fin',
          gt: (v, dateMin) =>  !v || this.dateGreaterThan(v, dateMin) || 'No puede ser menor que la fecha de inicio',
        },
        hhmm: {
          format: v => !v || /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v) || 'Debe tener formato hh:mm',
          lt: (v, hourMax) =>  !v || this.hhmmLessThan(v, hourMax) || 'No puede ser mayor a la hora fin',
          gt: (v, hourMin) => !v || this.hhmmGreaterThan(v, hourMin) || 'No puede ser menor que la hora de inicio'
        }
      },
    }
  },

  methods: {
    validateDNI (value) {
      value = value ? value.toUpperCase().trim() : null;
      // value = value.padStart(9, '0');
      var esValido = /^([0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]|[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET])$/.test(value);

      if (esValido === false) {
          return false;
      }

      var letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKET";

      var nie = value.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');

      var letra1 = value.substr(-1);
      var posicion = parseInt(nie.substr(0, 8)) % 23;
      var letra2 = letrasValidas.charAt(posicion);

      return letra1 === letra2;
    },
    validateCIF (value) {
      value = value ? value.toUpperCase().trim() : null;

      var esValido = /^[A-Z]{1}[0-9]{7}[A-J0-9]{1}$/.test(value);

      if (esValido === false) {
          return false;
      }

      var letrasValidas = "JABCDEFGHI";

      var digitos = value.substr(1, value.length - 2);
      var letra = value.substr(0, 1);
      var control = value.substr(value.length - 1);
      var suma = 0;

      if (!letra.match(/[A-Z]/)) {
        return false;
      }

      for (var i = 0; i < digitos.length; i++) {
        var digito = parseInt(digitos[i]);

        if (isNaN(digito)) {
          return false;
        }

        if (i % 2 === 0) {
          digito *= 2;
          if (digito > 9) {
            digito = parseInt(digito / 10) + (digito % 10);
          }

          suma += digito;
        } else {
          suma += digito;
        }
      }

      suma %= 10;
      if (suma !== 0) {
        digito = 10 - suma;
      } else {
        digito = suma;
      }

      if (letra.match(/[ABEH]/)) {
        return String(digito) === control;
      }
      if (letra.match(/[NPQRSW]/)) {
        return letrasValidas[digito] === control;
      }

      return String(digito) === control || letrasValidas[digito] === control;
    },

    removeAccents(str) {
      var map = {
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
      }
      
      for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern)
      }

      return str;
    },

    dateLessThan(v, dateMax){
      return v && dateMax ? new Date(v).getTime() <= new Date(dateMax).getTime() : true
    },
    dateGreaterThan(v, dateMin){
      return v && dateMin ? new Date(v).getTime() > new Date(dateMin).getTime() : true
    },

    hhmmLessThan(v, hourMax) {
      return v && hourMax ? this.setHoursToDate(Date.now(), v) <= this.setHoursToDate(Date.now(), hourMax) : true
    },

    hhmmGreaterThan(v, hourMin) {
      return v && hourMin ? this.setHoursToDate(Date.now(), v) > this.setHoursToDate(Date.now(), hourMin) : true
    },

    setHoursToDate(date = Date.now(), dateHours){
        return new Date(date).setHours(dateHours.split(':')[0],dateHours.split(':')[1] );
    }
    // hhmmGreaterThan(v, hourMin)

  }
}