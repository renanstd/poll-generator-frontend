<template>
  <b-container fluid>
    <b-row align-h="center" v-for="poll in polls" v-bind:key="poll.id">
      <b-col cols="5">
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
    axios.get('http://127.0.0.1:8000/api/polls')
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
      console.log(error.response.data.detail);
    })
  }
}
</script>
