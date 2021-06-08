<template>
  <b-form @submit="onSubmit" @reset="onReset">

    <b-modal id="modal-success" title="Enquete criada">
      <p class="my-4">Enquete criada com sucesso!</p>
    </b-modal>

    <b-form-group
      id="input-group-1"
      label="Título:"
      label-for="title"
      class="labels"
    >
      <b-form-input
        id="title"
        v-model="form.title"
        placeholder="Digite o título da enquete"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="Descrição:"
      label-for="description"
      class="labels"
    >
      <b-form-textarea
        id="description"
        v-model="form.description"
        placeholder="Descreva a enquete"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>

    <b-form-group
      id="input-group-3"
      label="Opções:"
      label-for="options"
      class="labels"
    >
      <b-button-group>
        <b-button>
          <b-icon variant="dark" icon="plus" v-on:click="add_option"></b-icon>
        </b-button>
        <b-button>
          <b-icon variant="dark" icon="dash" v-on:click="sub_option"></b-icon>
        </b-button>
      </b-button-group>
    </b-form-group>

    <div v-for="n in options" :key="n">
      <component
        v-bind:is="current_component"
        v-bind="{index: n}"
        @description_changed="description => {form.options.push(description)}"
      >
      </component>
    </div>

    <br>
    <b-button type="submit" variant="dark">Salvar</b-button>
    <b-button type="reset">Resetar</b-button>

  </b-form>
</template>

<style scoped>
.labels {
  color: white;
  font-weight: bold;
}
</style>

<script>
import axios from "axios"
import router from '../router'
import PollOption from '@/components/PollOption.vue'

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        options: [],
      },
      options: 1,
      current_component: PollOption
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      const path = process.env.VUE_APP_API_URL + "/polls/"
      const token = this.$cookies.get("token")
      const headers = {'Authorization': `Bearer ${token}`}

      let formated_options = []
      this.form.options.forEach(option => {
        formated_options.push({description: option})
      });

      const data = {
        title: this.form.title,
        description: this.form.description,
        options: formated_options,
      }

      axios.post(path, data, {headers})
      .then(() => {
        this.$bvModal.show('modal-success')
        this.onReset(null)
        this.$emit('form_submited')
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
    },

    onReset(event) {
      if (event) {
        event.preventDefault()
      }
      this.form.title = ''
      this.form.description = ''
      this.form.options = []
      this.options = 1
    },

    add_option(event) {
      event.preventDefault()
      this.options += 1
    },

    sub_option(event) {
      event.preventDefault()
      if (this.options > 1) {
        this.options -= 1
      }
    }
  }
}
</script>
