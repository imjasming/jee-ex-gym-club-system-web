<template>
  <el-main id="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-main>
</template>

<script>
  export default {
    name: 'appMain'
  }
</script>

<style scoped>
  #app-main {
    display: block;
    padding: 1rem 10%;
  }
</style>
