<template>
  <div class="app-body">
    <sidebar class="sidebar"></sidebar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import {sidebar, appMain} from './components'

  export default {
    name: 'layout',

    components: {
      sidebar,
      appMain
    }
  }
</script>

<style scoped>

</style>
