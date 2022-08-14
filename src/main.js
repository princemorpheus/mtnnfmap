import { createApp } from 'vue'
// import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app
  // .use(VueGoogleMaps, {
  //   load: {
  //     key: 'AIzaSyBydrAVgBUHolVBPl12Ioog75Nd4Y8LAio'
  //   }
  // })
  .mount('#app')
