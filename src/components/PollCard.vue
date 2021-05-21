<template>

  <b-card
    :title=poll_title
    style="max-width: 30rem"
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
      <b-button block>Votar</b-button>
    </template>

  </b-card>

</template>

<script>
  export default {
    name: 'PollCard',
    props: {
      poll_title: String,
      poll_description: String,
      options: Array,
    },
    data() {
      return {
        selected: null,
      }
    }
  }
</script>
