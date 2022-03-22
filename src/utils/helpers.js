/** Ejemplo de uso
 * computed: {
    debounceNif: {
      get() {
        return this.model.persona.nif
      },
      set: debounce(function (value) {
        this.model.persona.nif = value;

        if(this.model.persona.nif && this.model.persona.nif.length == 9 && this.creationMode) {
          this.eventGetInfoFromNif(this.model.persona.nif);
        }
      }),
    },
  }
 */
export function debounce (fn, delay=500) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}


// 
export function downloadDocument(response){
  var link = document.createElement("a");

  var blob = new Blob([response.data], { type: response.headers["content-type"] });

  link.href = window.URL.createObjectURL(blob);
  link.download = response.headers["x-file-name"];
  document.body.appendChild(link);
  link.click();

  setTimeout(function () {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(window.URL.createObjectURL(blob));
  }, 1000);
}