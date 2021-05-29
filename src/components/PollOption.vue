<template>
  <b-input-group :prepend="index">
    <b-form-input
      v-model="description"
      placeholder="Digite a opção..."
      @change="option_changed"
    ></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  name: 'PollOption',
  props: {
    index: Number,
  },

  data() {
    return {
      description: '',
    }
  },

  methods: {
    option_changed() {
      this.$emit('description_changed', this.description)
    }
  },
}
</script>
