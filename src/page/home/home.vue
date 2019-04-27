<template>
  <div id="home">
    <el-tabs type="border-card">
      <el-tab-pane label="健身房">
        <gym-container></gym-container>
      </el-tab-pane>
      <el-tab-pane label="健身教练">
        <trainer-container></trainer-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {trainerContainer, gymContainer} from '@/page/home/components'

  export default {
    name: 'home',
    components: {
      trainerContainer,
      gymContainer,
    }
  }
</script>

<style scoped>

</style>
