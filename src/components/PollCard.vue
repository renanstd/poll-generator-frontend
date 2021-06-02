<template>
  <b-overlay
    :show="loading"
  >
    <b-card
      :title=poll_title
    >
      <b-card-text>
        {{ poll_description }}
      </b-card-text>

      <b-form-group>
        <b-form-radio-group
          id="btn-radios"
          v-model="selected"
          :options="options"
          name="radios-btn-stacked"
          button-variant="danger"
          buttons
          stacked
          class="container-fluid"
        ></b-form-radio-group>
      </b-form-group>

      <template #footer>
        <b-button variant="dark" v-on:click="vote">Votar</b-button>
      </template>

    </b-card>
  </b-overlay>
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
      loading: false,
    }
  },

  methods: {
    vote: function() {
      this.loading = true
      const selected_option = this.selected
      const path = process.env.VUE_APP_API_URL + `/options/${selected_option}/vote/`
      const session_id = this.$cookies.get('session_id')
      axios.post(path, {session_id})
      .then((response) => {
        console.log(response.data)
        this.loading = false
      })
      .catch((error) => {
        console.log("Erro ao enviar voto");
        console.log(error.response.data.detail);
        this.loading = false
      })
    }
  }
}
</script>
