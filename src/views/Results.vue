<template>
  <b-container fluid>
    <NavBar/>
    <b-row align-h="center" class="text-center">
      <b-col cols="5">
        <h1>Resultados</h1>
      </b-col>
    </b-row>

    <b-row
      v-for="poll in polls"
      v-bind:key="poll.id"
      align-h="center"
    >
      <b-col cols="10">
        <b-card
          :title="poll.title"
        >
          <b-card-text>
            <b-row v-for="option in poll.options" v-bind:key="option.id">
              <b-col>
                {{ option.description }}: {{ option.votes }}
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from "axios"

export default {
  name: 'Admin',
  components: {
    NavBar,
  },

  data() {
    return {
      polls: [],
    }
  },

  created() {
    this.get_data()

    const path = process.env.VUE_APP_WEBSOCKET_URL
    this.connection = new WebSocket(path)

    this.connection.onopen = () => {
      console.log("Websocket conectado!")
    }

    this.connection.onmessage = (event) => {
      const obj_data = JSON.parse(event.data)
      const poll_id = obj_data.message.id

      this.polls.forEach(poll => {
        if (poll.id === poll_id) {
          poll.options = obj_data.message.options
        }
      })
    }
  },

  methods: {
    get_data() {
      const path = process.env.VUE_APP_API_URL + "/polls"
      axios.get(path)
      .then((response) => {
        this.polls = response.data
      })
      .catch(() => {
        console.log("Erro ao coletar enquetes");
      })
    }
  }
}
</script>
