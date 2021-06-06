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
    meta: {
      title: 'Público Geral Enquetes'
    }
  },
  {
    path: '/master',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Criação de Enquete'
    }
  },
  {
    path: '/master/results',
    name: 'Resultados',
    component: Results,
    meta: {
      title: 'Resultados'
    }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  // Seta o título da página no browser
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
});

export default router
