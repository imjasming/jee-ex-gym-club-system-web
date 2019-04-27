<template>
  <div id="myTrainers">
    <trainer-item v-for="item in trainerList" :trainer="item" :key="item.id"></trainer-item>
  </div>
</template>

<script>
  import trainerItem from '@/components/trainerItem'

  export default {
    name: 'myTrainer',
    components: {
      trainerItem
    },
    data () {
      return {}
    },
    computed: {
      trainerList () {
        return this.$store.state.user.trainerList
      }

    },
    mounted () {
      this.getPrivateTrainers()
    },
    methods: {
      getPrivateTrainers () {
        this.$store.dispatch('getMyTrainerList')
      }
    }
  }
</script>

<style scoped>

</style>
