import Vue from 'vue'
//import App from './App.vue' 
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master'
import {store} from './store/store'


const EventBus = new Vue();
export default EventBus;

Vue.config.productionTip = false
Vue.use(VueRouter)


const router = new VueRouter({
  routes,
  mode:'history'
})

new Vue({
  store,
  router:router,
  render: h => h(Master),
}).$mount('#app')
