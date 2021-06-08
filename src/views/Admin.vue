<template>
  <b-container fluid>
    <NavBar/>
    <b-row align-h="center" class="text-center">
      <b-col cols="10">
        <h1>Criar nova enquete</h1>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="10">
        <FormPoll @form_submited="get_data()"/>
      </b-col>
    </b-row>

    <br>

    <b-row align-h="center" class="text-center">
      <b-col cols="10">
        <h1>Enquetes criadas</h1>
      </b-col>
    </b-row>

    <!-- Tabela de enquetes criadas -->
    <b-row align-h="center">
      <b-col cols="10">

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
              v-if="poll.item.active"
              variant="primary"
              @click="close_poll(poll.item.id)"
            >
              Encerrar
            </b-button>

            <b-button
              v-if="!poll.item.active"
              variant="primary"
              @click="reopen_poll(poll.item.id)"
            >
              Reabrir
            </b-button>

            <b-button
              variant="danger"
              @click="delete_poll(poll.item.id)"
            >
              Apagar
            </b-button>
          </template>

        </b-table>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import axios from "axios"
import router from '../router'
import NavBar from '@/components/NavBar.vue'
import FormPoll from '@/components/FormPoll.vue'

export default {
  name: 'Admin',

  components: {
    NavBar,
    FormPoll,
  },

  data() {
    return {
      polls: [],
      loading: false,
      fields: [
        {key: 'title', label: 'Título'},
        {key: 'actions', label: 'Ações'}
      ],
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
          poll.active = element.active
          polls.push(poll)
        })
        this.polls = polls
        this.loading = false
      })
      .catch(() => {
        console.log("Erro ao coletar enquetes")
        this.loading = false
      })
    },

    delete_poll(poll_id) {
      this.loading = true
      const path = process.env.VUE_APP_API_URL + "/polls/" + poll_id
      const token = this.$cookies.get("token")
      const headers = {'Authorization': `Bearer ${token}`}

      axios.delete(path, {headers})
      .then(() => {
        this.get_data()
      })
      .catch((error) => {
        const status_code = error.response.status
        // Redirecionar para tela de login caso a sessão tenha expirado
        if (status_code === 401) {
          router.push('/login')
        } else {
          console.log(error)
        }
      })
      this.loading = false
    },

    close_poll(poll_id) {
      this.loading = true
      const path = process.env.VUE_APP_API_URL + "/polls/" + poll_id + '/'
      const data = {active: false}
      const token = this.$cookies.get("token")
      const headers = {'Authorization': `Bearer ${token}`}

      axios.patch(path,data, {headers})
      .then(() => {
        this.get_data()
      })
      .catch((error) => {
        const status_code = error.response.status
        // Redirecionar para tela de login caso a sessão tenha expirado
        if (status_code === 401) {
          router.push('/login')
        } else {
          console.log(error)
        }
      })
      this.loading = false
    },

    reopen_poll(poll_id) {
      this.loading = true
      const path = process.env.VUE_APP_API_URL + "/polls/" + poll_id + '/'
      const data = {active: true}
      const token = this.$cookies.get("token")
      const headers = {'Authorization': `Bearer ${token}`}

      axios.patch(path,data, {headers})
      .then(() => {
        this.get_data()
      })
      .catch((error) => {
        const status_code = error.response.status
        // Redirecionar para tela de login caso a sessão tenha expirado
        if (status_code === 401) {
          router.push('/login')
        } else {
          console.log(error)
        }
      })
      this.loading = false
    }
  }
}
</script>
