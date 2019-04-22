<template>
  <div id="headBar">
    <div class="page-title">{{pageRouter.meta.title}}</div>
  </div>
</template>

<script>
  export default {
    name: 'headBar',
    data () {
      return {
        pageRouter: null,
      }
    },
    created () {
      this.getCurrentPageRouter()
    },
    watch: {
      $route () {
        this.getCurrentPageRouter()
      }
    },
    methods: {
      getCurrentPageRouter () {
        let matched = this.$route.matched.filter(item => item.name)
        const last = matched[matched.length - 1]
        if (last && last.name) {
          this.pageRouter = last
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/common.scss";
  #headBar {
    position: relative;
    top: 0;
    width: 100%;
    height: 2.5rem;
    padding: 0.2rem 0.2rem 0.2rem 0.5rem;
    margin-bottom: 0.1rem;
    display: block;
    z-index: 999;
    border-bottom: 1px solid $fade-gray-color;
  }
</style>
