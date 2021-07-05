// // import { Vue, createApp } from 'vue'
// import App from './App.vue'

// import Vue from 'vue'
// // import vuetify from 'vuetify' // path to vuetify export

// // new Vue({
// //   vuetify,
// // }).$mount('#app')

// // createApp(App).mount('#app')

// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// Vue.use(Vuetify);
// new Vue({
//     vuetify : new Vuetify(),
//     render: h => h(App),
// }).$mount('#app')

import Vue from 'vue' 
import App from './App.vue' 
// import router from './router' 
import vuetify from './plugins/vuetify'; 

Vue.config.productionTip = false 

new Vue({ 
    // router, 
    vuetify, 
    render: h => h(App) 
}).$mount('#app')

