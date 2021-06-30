import { createApp } from 'vue'
import App from './App.vue'
import './router/root'
import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
/* other import */
import { MainPage, AboutPage } from './page';

/* configs ... */
const routes = [
  {
    path: '/',
    component: MainPage
 },
 {
    path: '/sub',
    component: AboutPage
 }
];

// router 객체생성
const router = new VueRouter({
    routes
  });
  
new Vue({
    render: h => h(App),
    router // router 추가
}).$mount('#app')
  
  

createApp(App).mount('#app')
