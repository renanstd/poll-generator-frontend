<template>
  <b-overlay
    :show="loading"
  >
    <b-card
      :title=poll_title
    >

      <b-alert
        :show="sucess_alert_timer"
        dismissible
        variant="success"
        fade
        @dismissed="sucess_alert_timer=0"
        @dismiss-count-down="success_countdown_changed"
      >
        Voto registrado com sucesso
      </b-alert>

      <b-alert
        :show="already_voted_timer"
        dismissible
        variant="info"
        fade
        @dismissed="already_voted_timer=0"
        @dismiss-count-down="info_countdown_changed"
      >
        Você já votou nessa enquete, apenas 1 voto por pessoa é permitido
      </b-alert>

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
      alert_seconds: 5,
      sucess_alert_timer: 0,
      already_voted_timer: 0,
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
        const status_code = response.status
        if (status_code === 200) {
          this.show_success_alert()
        } else {
          this.show_already_voted_alert()
        }
        this.loading = false
      })
      .catch((error) => {
        console.log("Erro ao enviar voto");
        console.log(error.response.data.detail);
        this.loading = false
      })
    },

    success_countdown_changed(sucess_alert_timer) {
      this.sucess_alert_timer = sucess_alert_timer
    },

    info_countdown_changed(info_alert_timer) {
      this.already_voted_timer = info_alert_timer
    },

    show_success_alert() {
      this.sucess_alert_timer = this.alert_seconds
    },

    show_already_voted_alert() {
      this.already_voted_timer = this.alert_seconds
    },
  }
}
</script>
