<template>
  <b-card
    :title=poll_title
  >
    <b-card-text>
      {{ poll_description }}
    </b-card-text>

    <b-form-group>
      <b-form-radio-group
        id="btn-radios-3"
        v-model="selected"
        :options=options
        name="radio-btn-stacked"
        button-variant="outline-primary"
        buttons
        stacked
      ></b-form-radio-group>
    </b-form-group>

    <template #footer>
      <b-button block v-on:click="vote">Votar</b-button>
    </template>
  </b-card>
</template>

<script>
import axios from "axios"

export default {
  name: 'PollCard',
  props: {
    poll_id: String,
    poll_title: String,
    poll_description: String,
    options: Array,
  },

  data() {
    return {
      selected: null,
    }
  },

  methods: {
    vote: function() {
      const selected_option = this.selected
      const path = process.env.VUE_APP_API_URL + `/options/${selected_option}/vote/`
      axios.get(path)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Erro ao enviar voto");
        console.log(error.response.data.detail);
      })
    }
  }
}
</script>
