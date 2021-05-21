<template>
  <b-container>
    <PollCard
      poll_title="Title"
      poll_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies ante nec dolor finibus, vitae rhoncus metus placerat."
      :options=options
    />
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
      options: [
        {
          text: 'Opção A',
          value: 'id1'
        },
        {
          text: 'Opção B',
          value: 'id2'
        }
      ]
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/polls')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data.detail);
    })
  }
}
</script>
