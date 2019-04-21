<template>
  <div id="profile">
    <div class="page-title">个人中心</div>
    <el-card shadow="never">
      <div class="user-profile">
        <div class="use-icon dp-in-bl">
          <img :src="'http://127.0.0.1:8082/img/head.png'">
        </div>
        <div class="dp-in-bl">
          <p>{{userInfo.username}}</p>
          <p>email: {{userInfo.email}}</p>
        </div>
      </div>
    </el-card>
    <el-card shadow="never">
      <el-form id="profileForm" class="input-form"
               label-position="left"
               label-width="6rem"
               :model="profileForm"
               ref="profileForm"
               :rules="profileRules">
        <el-form-item prop="email" label="更新邮箱">
          <el-input type="text" v-model="profileForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="dataLoading" @click.native.prevent="updateProfile">更新</el-button>
        </el-form-item>
      </el-form>
      <div class="line"></div>
      <el-form id="pswForm" class="input-form"
               label-position="left"
               label-width="6rem"
               :model="pswForm"
               ref="profileForm"
               :rule="pswRules">
        <el-form-item prop="password" label="更新密码">
          <el-input type="password" v-model="pswForm.password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input type="password" v-model="pswForm.repassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="updatePsw">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import {emailRule, passwordRule} from '@/utils/validator'

  export default {
    data () {
      const repasswordRule = (rule, value, callback) => {
        if (this.registerForm.password !== value) {
          callback(new Error('两次密码不相同！'))
        }
        return passwordRule(rule, value, callback)
      }
      return {
        profileTitle: '',
        dataLoading: false,
        profileForm: {
          email: ''
        },
        pswForm: {
          password: '',
          repassword: ''
        },
        profileRules: {
          email: [{trigger: 'blur', validator: emailRule}]
        },
        pswRules: {
          password: [{trigger: 'blur', validator: passwordRule}],
          repassword: [{trigger: 'blur', validator: repasswordRule}],
        }
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },
    created () {
      this.initUser()
    },
    methods: {
      initUser () {
        request({
          url: '/user/get-info',
          method: 'get'
        }).then(response => {
          const data = response.data
          this.$store.commit('SET_INFO', data)
        }).catch(() => {

        })
      },
      updateProfile () {
        this.$refs.profileForm.validate(valid => {
          if (valid) {
            this.dataLoading = true
            this.$store.dispatch('updateUserProfile', this.profileForm).then(() => {
              this.dataLoading = false
            }).catch(error => {
              this.dataLoading = false
            })
          } else {
            return false
          }
        })
      }
    },
    components: {},
  }
</script>

<style lang="scss" scoped>
  @import "src/style/common.scss";

  .user-profile {
    display: inline-block;

    img {
      border: 2px solid $fade-gray-color;
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 1rem;
    }

    div {
      :first-child {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      :last-child {
        font-size: 0.8rem;
        color: gray;
      }
    }

  }
</style>
