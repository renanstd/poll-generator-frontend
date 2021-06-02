<template>
  <b-table
    :busy="loading"
    dark
    striped
    hover
    :items="polls"
    :fields="fields"
  >

    <template #table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Carregando...</strong>
      </div>
    </template>

    <template #cell(actions)="poll">
      <b-button
        variant="primary"
        @click="close_poll(poll.item.id)"
      >
        Encerrar
      </b-button>
      <b-button
        variant="danger"
        @click="delete_poll(poll.item.id)"
      >
        Apagar
      </b-button>
    </template>

  </b-table>
</template>

<script>
import axios from "axios"

export default {
  name: 'PollList',

  data() {
    return {
      polls: [],
      loading: false,
      fields: ['title', 'actions'],
    }
  },

  created() {
    this.get_data()
  },

  methods: {
    get_data() {
      this.loading = true
      const path = process.env.VUE_APP_API_URL + "/polls"
      axios.get(path)
      .then((response) => {
        // Formatar o objeto options no formato que o b-form-radio espera
        let polls = []
        response.data.forEach(element => {
          let poll = {}
          poll.title = element.title
          poll.id = element.id
          polls.push(poll)
        })
        this.polls = polls
        this.loading = false
      })
      .catch(() => {
        console.log("Erro ao coletar enquetes");
        this.loading = false
      })
    },

    delete_poll(poll_id) {
      this.loading = true
      const path = process.env.VUE_APP_API_URL + "/polls/" + poll_id
      axios.delete(path)
      .then(() => {
        this.get_data()
      })
      this.loading = false
    },

    close_poll(poll_id) {
      this.loading = true
      const path = process.env.VUE_APP_API_URL + "/polls/" + poll_id + '/'
      const data = {active: false}
      axios.patch(path,data)
      .then(() => {
        this.get_data()
      })
      this.loading = false
    }
  }
}
</script>
