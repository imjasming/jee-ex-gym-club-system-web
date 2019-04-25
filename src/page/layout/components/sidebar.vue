<template>
  <el-menu id="nav"
           default-active="2"
           class="el-menu-vertical-demo"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#409eff">

    <el-submenu index="1">
      <template slot="title">
        <span>首页</span>
      </template>
      <router-link :to="'/home/trainer'">
        <el-menu-item index="1-1">健身中心</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>我的</span>
      </template>
      <router-link :to="'/me/profile'">
        <el-menu-item index="2-1">个人中心</el-menu-item>
      </router-link>
      <router-link :to="'/me/trainer'">
        <el-menu-item index="2-2">私人教练</el-menu-item>
      </router-link>
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
    computed: {
      routes () {
        return this.$router.options.routes
      }
    },
    methods: {}
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
