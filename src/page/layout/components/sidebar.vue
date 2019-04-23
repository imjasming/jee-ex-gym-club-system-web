<template>
  <el-menu id="nav"
           default-active="2"
           class="el-menu-vertical-demo"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#409eff">

    <el-submenu index="1">
      <template slot="title">
        <span>主页</span>
      </template>
      <el-menu-item index="1-1">健身</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>我的</span>
      </template>
      <el-menu-item index="2-1">个人中心</el-menu-item>
      <el-menu-item index="2-2">私人教练</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'sidebar',
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

<style lang="scss" scoped>
  #nav {
    position: fixed;
    left: 0;
    height: 100%;
    z-index: 100;
  }
</style>
