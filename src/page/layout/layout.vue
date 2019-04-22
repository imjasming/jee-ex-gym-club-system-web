<template>
  <div class="app-body">
    <sidebar class="sidebar"></sidebar>
    <div class="main-container">
      <headBar></headBar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import {sidebar, appMain, headBar} from './components'

  export default {
    name: 'layout',

    components: {
      sidebar,
      appMain,
      headBar,
    }
  }
</script>

<style scoped>

</style>
