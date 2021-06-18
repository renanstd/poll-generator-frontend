<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>Área Admin</b-navbar-brand>

    <!-- Botão de toggle da navbar -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <!-- Tudo que está aqui, será "fechado" quando a navbar fica pequena -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#/">Home</b-nav-item>
        <b-nav-item href="#/master">Criação</b-nav-item>
        <b-nav-item href="#/master/results">Resultados</b-nav-item>
      </b-navbar-nav>

      <!-- Itens alinhados a direita da navbar -->
      <b-navbar-nav class="ml-auto">
        <b-button @click="logout">Sair</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import router from '../router'

export default {
  methods: {
    logout(event) {
      event.preventDefault()
      this.$cookies.remove("token")
      router.push('/login')
    }
  }
}
</script>
