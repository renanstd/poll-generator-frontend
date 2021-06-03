<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  background-color: #f9485a;
  min-height: 100vh;
  min-width: 100vh;
}
@font-face {
  font-family: "Reckoner";
  src: local("Reckoner"), url(./assets/fonts/Reckoner.ttf) format("truetype");
}
h1 {
  text-align: center;
  color: white;
  font-family: "Reckoner";
  text-shadow: 2px 2px 5px black;
}
</style>
