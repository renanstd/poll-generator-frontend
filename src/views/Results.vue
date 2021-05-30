<template>
  <b-container fluid>
    <NavBar/>
    <b-row align-h="center" class="text-center">
      <b-col cols="5">
        <h1>Resultados</h1>
      </b-col>
    </b-row>

    <b-row v-for="poll in Object.keys(polls)" v-bind:key="poll.poll_id">
      <b-col cols="6">
        AAAAAAAAAAAAAAAAAAAAAAA
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Admin',
  components: {
    NavBar,
  },

  data() {
    return {
      polls: {},
    }
  },

  created() {
    const path = process.env.VUE_APP_WEBSOCKET_URL
    this.connection = new WebSocket(path)

    this.connection.onopen = () => {
      console.log("Websocket conectado!");
    }

    // let self = this
    this.connection.onmessage = (event) => {
      const obj_data = JSON.parse(event.data)
      console.log(obj_data)
      this.polls[obj_data.message.poll_id] = obj_data.message
    }
  },

}
</script>
