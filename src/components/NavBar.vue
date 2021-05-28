<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>Área do Mestre</b-navbar-brand>

    <!-- Botão de toggle da navbar -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <!-- Tudo que está aqui, será "fechado" quando a navbar fica pequena -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Criação</b-nav-item>
        <b-nav-item href="#">Resultados</b-nav-item>
      </b-navbar-nav>

      <!-- Itens alinhados a direita da navbar -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Mestre" right>
          <b-dropdown-item href="#">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
