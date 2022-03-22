import axios from 'axios';

const debug = process.env.NODE_ENV !== 'production'
const publicUrl = process.env.VUE_APP_PUBLIC_SERVICE_URL;

const devAuth = {
  // username: 'pruebas-gds@umivale.es',
  username: '',
  password: ''
}

const publicAPI = axios.create({
  baseURL: publicUrl,
  headers: { 'content-type': 'application/json'},
  auth: debug ? devAuth : null
});

// Response Interceptor
publicAPI.interceptors.response.use((response => {
  checkVersionHeader(response)
  return response;
}));






// CheckVersion
const title = "Recargue la página";
const text = "Esta aplicación se ha actualizado, tome nota de los datos que no haya guardado y pulse en Actualizar para continuar con su solicitud";
const buttonText = "Actualizar";
let lock = false;

const checkVersionHeader= (response) => {
  var version = response.headers['x-service-version']; // Formato: 202102.1.49-SNAPSHOT#2021-03-15T12:27:35Z
  let versionID= version.split('#')[0];
  window.localStorage.setItem('localVersion', version)

  if(window.$vue.$appVersion != versionID){ // Caso en el que la version es la misma
    if(!lock){
      lock=true;
      window.$vue.$showMessage.confirm(title, text, buttonText).then(resp => {
        if(resp) {
          window.location.reload();
        }
      }).finally(() => lock=false);
    }
  } else if( versionID.includes('SNAPSHOT') ) { // Si la version es la misma || la hora es distinta
    manageLocalStorageVersion(version)
  }
}

const manageLocalStorageVersion = (version) => {
  let localVersion = window.localStorage.getItem('localVersion');
  if(localVersion && localVersion != version){
    if(!lock){
      lock=true;
      window.$vue.$showMessage.confirm(title, text, buttonText).then(resp => {
        if(resp) {
          window.localStorage.setItem('localVersion', version)
          window.location.reload();
        }
      }).finally(() => lock=false);
    }
  } else {
    window.localStorage.setItem('localVersion', version);
  }
}

export default publicAPI;