<template>
  <div id="trainersContainer">
    <trainer-item v-for="item in trainerList" :trainer="item" :key="item.id">
    </trainer-item>
    <div class="my-card pd-none">
      <el-button style="width: 100%" v-bind:disabled="isLastPage" @click="getTrainerList"
                 :loading="dataLoading">
        {{isLastPage?'没有更多数据了':'加载更多'}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import {fetch, serverUrl} from '@/utils/axios'
  import {Message} from 'element-ui'
  import trainerItem from '@/components/trainerItem'

  export default {
    name: 'home',
    components: {
      trainerItem
    },
    data () {
      return {
        trainerList: [],
        currentPage: 0,
        pageSize: 10,
        totalPage: 0,
        isLastPage: false,
        dataLoading: false,
      }
    },
    created () {
    },
    mounted () {
      this.getTrainerList()
    },
    methods: {
      getTrainerList () {
        this.dataLoading = true
        fetch('/trainers', {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        }).then(data => {
          if (data) {
            for (let item of data.content) {
              item.icon = serverUrl + '/img/trainericon.jpg'
              this.trainerList.push(item)
            }
            this.currentPage++
            this.isLastPage = data.last
          } else {
            Message({
              message: 'data loading failure',
              type: 'error',
              duration: 3 * 1000
            })
          }
        }).catch(error => {
          if (error.response) {
            const code = error.response.status
            if (code === 404) {
              this.isLastPage = true
            }
          } else {
            Message({
              message: error.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        })
        this.dataLoading = false
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
