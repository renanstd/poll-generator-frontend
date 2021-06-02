<template>
  <b-container fluid>
    <NavBar/>
    <b-row align-h="center" class="text-center">
      <b-col cols="10">
        <h1>Criar nova enquete</h1>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="10">
        <FormPoll/>
      </b-col>
    </b-row>

    <br>

    <b-row align-h="center" class="text-center">
      <b-col cols="10">
        <h1>Enquetes criadas</h1>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="10">
        <PollList/>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FormPoll from '@/components/FormPoll.vue'
import PollList from '@/components/PollList.vue'

export default {
  name: 'Admin',
  components: {
    NavBar,
    FormPoll,
    PollList,
  },

}
</script>
