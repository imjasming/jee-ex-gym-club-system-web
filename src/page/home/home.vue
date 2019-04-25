<template>
  <div id="home">
    <trainer-item v-for="item in trainerList" :trainer="item" :key="item.id">
    </trainer-item>
    <div class="my-card pd-none">
      <el-button style="width: 100%" v-bind:disabled="loadMoreTrainer" @click="getTrainerList"
                 :loading="trainerLoading">
        {{loadMoreTrainer?'没有更多数据了':'加载更多'}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import {fetch} from '@/utils/request'
  import {Message} from 'element-ui'
  import trainerItem from './components/trainerItem'
  import {serverUrl} from '@/utils/request'

  export default {
    name: 'home',
    components: {
      trainerItem
    },
    data () {
      return {
        gymList: [],
        trainerList: [],
        trainerPage: {
          current: 0,
          pageSize: 10,
          totalPage: 0,
        },
        loadMoreTrainer: false,
        trainerLoading: false,
      }
    },
    computed: {
      isFollowed () {
      }
    },
    created () {
    },
    mounted () {
      this.getTrainerList()
    },
    methods: {
      getTrainerList () {
        this.trainerLoading = true
        fetch('/trainers', {
          pageNo: this.trainerPage.current,
          pageSize: this.trainerPage.pageSize
        }).then(data => {
          if (data) {
            for (let item of data.content) {
              item.icon = serverUrl + '/img/trainericon.jpg'
              this.trainerList.push(item)
            }
            this.trainerPage.current++
          } else {
            Message({
              message: '',
              type: 'error',
              duration: 3 * 1000
            })
          }
        }).catch(error => {
          if (error.response) {
            const code = error.response.status
            if (code === 404) {
              this.loadMoreTrainer = true
            }
          } else {
            Message({
              message: error.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        })
        this.trainerLoading = false
      }
    },
    filters: {}
  }
</script>

<style lang="scss" scoped>

</style>
