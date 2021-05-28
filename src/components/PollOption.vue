<template>
  <b-input-group prepend="Opção">
    <b-form-input
      v-model="description"
      placeholder="Digite a opção..."
    ></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  name: 'PollOption',
  props: {
    index: Number,
  },

  created() {
    console.log(this.index);
  },

  data() {
    return {
      description: null,
    }
  }
}
</script>
