<template>
  <b-container fluid>

    <b-row align-h="center">
      <b-col cols="10">
        <h1>Login</h1>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="10">
        <b-card>
          <b-card-text>
            <b-form @submit="on_submit">

              <b-form-group id="form-group-1" label="Usuário" label-for="user">
                <b-form-input
                  id="user"
                  placeholder="Digite seu usuário"
                  v-model="form.username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="form-group-2" label="Senha" label-for="password">
                <b-form-input
                  id="password"
                  placeholder="Digite sua senha"
                  v-model="form.password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-alert :show="show_alert" dismissible>
                Usuário ou senha inválidos
              </b-alert>

              <b-button type="submit" variant="danger">Login</b-button>

            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>


<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Login',

  data() {
    return {
      form: {},
      show_alert: false,
    }
  },

  methods: {
    on_submit(event) {
      event.preventDefault()

      const payload = {
        username: this.form.username,
        password: this.form.password,
      }

      const path = process.env.VUE_APP_API_URL + "/token/"

      axios.post(path, payload)
      .then((response) => {
        const token = response.data.access
        this.$cookies.set('token', token)
        router.push('/master')
      })
      .catch(() => {
        this.show_alert = true
      })
    },
  },
}
</script>
