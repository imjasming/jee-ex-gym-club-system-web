<template>
  <div class="my-card">
    <div class="dp-in-bl head-icon-container">
      <img class="round-head-icon" :src="trainer.icon"/>
    </div>
    <div class="dp-in-bl">
      <p class="prim-text">{{trainer.name}}</p>
      <p class="sub-text">{{trainer.intro}}</p>
    </div>
    <div class="dp-in-bl">
      <el-button class="" v-bind:disabled="hasAdded" @click="addTrainer" :loading="dataLoading">
        {{hasAdded?'已添加':'添加'}}
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'trainerItem',
    props: {
      trainer: {
        type: Object
      }
    },
    data () {
      return {
        dataLoading: false
      }
    },
    computed: {
      hasAdded () {
        const userTrainers = this.$store.state.user.trainerList
        return userTrainers.map(item => item.id).includes(this.trainer.id)
      }
    },
    methods: {
      addTrainer () {
        this.dataLoading = true
        this.$store.dispatch('addTrainer', this.trainer.id).then(() => {
        })
        this.dataLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .head-icon-container {
    width: 2.7rem;
    height: 2.7rem;
  }

  div.dp-in-bl {
    margin-right: 1rem;

    button {
      width: 5rem;
      padding: 0.95rem;
    }

  }
</style>
