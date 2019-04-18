<template>
  <el-menu id="foot_nav"
           class="el-menu-demo"
           :router="true"
           :default-active="activeIndex"
           mode="horizontal"
           @select="handleSelect">
    <el-menu-item index="1" route="{path:'home'}">Home</el-menu-item>
    <el-menu-item index="2" route="{path:'profile'}">Me</el-menu-item>
  </el-menu>
  <!--<div class="line"></div>-->
  <script>
    export default {
      data () {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        }
      },
      methods: {
        handleSelect (key, keyPath) {
          console.log(key, keyPath)
        }
      }
    }
  </script>
</template>

<script>
  export default {
    name: 'footNav'
  }
</script>

<style lang="scss" scoped>
  #foot_nav{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2.0rem;
    display: flex;
    z-index: 100;
  }
</style>
