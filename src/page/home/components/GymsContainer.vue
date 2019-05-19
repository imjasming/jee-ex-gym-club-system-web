<template>
  <div class="gym-card-container">
    <img-text-card v-for="item in gymList" :data-img-text-obj="item" :key="item.id"></img-text-card>
    <div class="my-card pd-none">
      <el-button style="width: 100%" v-bind:disabled="isLastPage" @click="getGymList"
                 :loading="dataLoading">
        {{isLastPage?'没有更多数据了':'加载更多'}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import ImgTextCard from '@/components/ImgTextCard'
  import {fetch, serverUrl} from '@/utils/axios'
  import {Message} from 'element-ui'

  export default {
    name: 'GymGridContainer',
    components: {
      ImgTextCard,
    },
    data () {
      return {
        gymList: [],
        currentPage: 0,
        pageSize: 10,
        totalPages: 0,
        isLastPage: false,
        dataLoading: false,
      }
    },
    mounted () {
      this.getGymList()
    },
    methods: {
      getGymList () {
        this.dataLoading = true
        fetch('/gym-list', {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        }).then(data => {
          if (data) {
            for (let item of data.content) {
              let obj = {}
              obj.img = serverUrl + '/img/gym.jpg'
              obj.title = item.gymName
              obj.sub = item.location
              obj.info = item.intro
              this.gymList.push(obj)
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
    }
  }
</script>

<style scoped>

</style>
