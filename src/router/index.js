import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Results from '../views/Results.vue'
import Login from '../views/Login.vue'

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
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Área do mestre - Login'
    }
  },
  {
    path: '/master',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Criação de Enquete',
      requiresAuth: true
    }
  },
  {
    path: '/master/results',
    name: 'Resultados',
    component: Results,
    meta: {
      title: 'Resultados',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

// Verifica credenciais em telas que requerem autenticação
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = Vue.$cookies.get("token")
    if (auth === null) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Seta o título da página no browser
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
});

export default router
