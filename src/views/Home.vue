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

    <b-row align-h="center">
      <b-col cols="5">
        <h1>Enquetes ativas</h1>
      </b-col>
    </b-row>

    <b-row class="mb-3" align-h="center" v-for="poll in polls" v-bind:key="poll.id">
      <b-col cols="6">
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

<style scoped>
h1 {
  text-align: center;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

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
    .catch((error) => {
      console.log("Erro ao coletar enquetes");
      console.log(error.response.data.detail);
    })
  }
}
</script>
