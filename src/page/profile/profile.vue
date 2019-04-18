<template>
  <div id="profile">

  </div>
</template>

<script>
  export default {
    name: 'me',
    data(){
      return {
        profileTitle: '',
        userInfo: this.$store.getters.userInfo,

      }
    }
  }
</script>

<style scoped>

</style>
