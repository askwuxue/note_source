import Vue from 'vue'
import App from './App.vue'
import VueRouter from './VueRouter/index'
import Index from '@/components/index'
import About from '@/components/about'

Vue.config.productionTip = false

const routes = [
  {
    path: '/index',
    component: Index
  },
  {
    path: '/about',
    component: About
  }
]

Vue.use(VueRouter)

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
