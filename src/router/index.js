import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Results from '../views/Results.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/master',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/master/results',
    name: 'Resultados',
    component: Results,
  }
]

const router = new VueRouter({
  routes
})

export default router
