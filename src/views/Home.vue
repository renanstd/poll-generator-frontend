<template>
  <b-container fluid>

    <b-row align-h="center">
      <b-col>
        <b-img
          :src="require('../assets/images/logo-publico-geral.png')"
          width="500px"
          center
        ></b-img>
      </b-col>
    </b-row>

    <b-row align-h="center" class="text-center">
      <b-col cols="1">
        <a href="https://twitter.com/PublicoGeral">
          <b-icon variant="dark" font-scale="2" icon="twitter"></b-icon>
        </a>
      </b-col>
      <b-col cols="1">
        <a href="https://www.instagram.com/publicogeraloficial/">
          <b-icon variant="dark" font-scale="2" icon="instagram"></b-icon>
        </a>
      </b-col>
      <b-col cols="1">
        <a href="https://www.facebook.com/publicogeralof">
          <b-icon variant="dark" font-scale="2" icon="facebook"></b-icon>
        </a>
      </b-col>
    </b-row>

    <br>
    <b-row align-h="center">
      <b-col cols="5">
        <h1>Enquetes ativas</h1>
      </b-col>
    </b-row>

    <b-row class="mb-3" align-h="center" v-for="poll in polls" v-bind:key="poll.id">
      <b-col cols="10">
        <PollCard
          :poll_id="poll.id"
          :poll_title="poll.title"
          :poll_description="poll.description"
          :options="poll.options"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios"
import PollCard from '@/components/PollCard.vue'

export default {
  name: 'Home',
  components: {
    PollCard
  },

  data() {
    return {
      polls: [],
    }
  },

  created() {
    this.check_or_create_cookies()
    const path = process.env.VUE_APP_API_URL + "/polls"
    axios.get(path)
    .then((response) => {
      // Formatar o objeto options no formato que o b-form-radio espera
      let polls = []
      response.data.forEach(element => {
        let poll = {}
        poll.title = element.title
        poll.description = element.description
        poll.options = []
        element.options.forEach(option => {
          poll.options.push({
            text: option.description,
            value: option.id
          })
        })
        polls.push(poll)
      })
      this.polls = polls
    })
    .catch(() => {
      console.log("Erro ao coletar enquetes");
    })
  },

  methods: {
    check_or_create_cookies() {
      // Verifica/cria cookie de sessão para o user atual
      const cookie = this.$cookies.get('session_id')
      if (cookie === null) {
        this.$cookies.set('session_id', Date.now())
      }
    }
  }
}
</script>
