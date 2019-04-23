<template>
  <div id="home">
    <el-card class="list-item"
             v-for="item in trainerList" :key="item.id"
             shadow="never">
      <div class="dp-in-bl head-icon-container">
        <img class="round-head-icon" :src="item.icon"/>
      </div>
      <div class="dp-in-bl">
        <p class="prim-text">{{item.name}}</p>
        <p class="sub-text">{{item.intro}}</p>
      </div>
      <!--<div class="dp-in-bl">
        <el-button class="" v-bind:disabled="item.id | isFollowed" @click="follow"
                   :loading="trainerLoading">
          {{loadMoreTrainer?'没有更多数据了':'加载更多'}}
        </el-button>
      </div>-->
    </el-card>
    <el-card class="" shadow="never">
      <el-button style="width: 100%" v-bind:disabled="loadMoreTrainer" @click="getTrainerList"
                 :loading="trainerLoading">
        {{loadMoreTrainer?'没有更多数据了':'加载更多'}}
      </el-button>
    </el-card>
  </div>
</template>

<script>
  import {fetch} from '@/utils/request'
  import {Message} from 'element-ui'

  export default {
    name: 'home',
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
              item.icon = 'http://127.0.0.1:8082/img/trainericon.jpg'
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
  .list-item {
    .head-icon-container {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
