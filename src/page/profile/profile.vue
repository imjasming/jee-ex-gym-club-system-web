<template>
  <div id="profile">
    <el-card shadow="never">
      <div class="user-profile">
        <div class="dp-in-bl head-icon-container">
          <img class="round-head-icon" :src="'http://127.0.0.1:8082/img/head.png'">
        </div>
        <div class="dp-in-bl">
          <p class="prim-text">{{userInfo.username}}</p>
          <p class="sub-text">email: {{userInfo.email}}</p>
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
          <el-button type="primary" :loading="profileLoading" @click.native.prevent="updateProfile">更新</el-button>
        </el-form-item>
      </el-form>
      <div class="line"></div>
      <el-form id="pswForm" class="input-form"
               label-position="left"
               label-width="6rem"
               :model="pswForm"
               ref="pswForm"
               :rules="pswRules">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input type="password" v-model="pswForm.oldPassword" placeholder="旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input type="password" v-model="pswForm.newPassword" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input type="password" v-model="pswForm.repassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="passwordLoading"
                     @click.native.prevent="updatePassword">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {fetch, post} from '@/utils/request'
  import {emailRule, passwordRule} from '@/utils/validator'
  import {Message} from 'element-ui'

  export default {
    data () {
      const repasswordRule = (rule, value, callback) => {
        if (this.registerForm.newPassword !== value) {
          callback(new Error('两次密码不相同！'))
        }
        return passwordRule(rule, value, callback)
      }
      return {
        profileTitle: '',
        profileLoading: false,
        passwordLoading: false,
        profileForm: {
          email: ''
        },
        pswForm: {
          oldPassword: '',
          newPassword: '',
          repassword: ''
        },
        profileRules: {
          email: [{trigger: 'blur', validator: emailRule}]
        },
        pswRules: {
          oldPassword: [{trigger: 'blur', validator: passwordRule}],
          newPassword: [{trigger: 'blur', validator: passwordRule}],
          repassword: [{trigger: 'blur', validator: repasswordRule}]
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
        fetch('/user/get-info').then(response => {
          this.$store.commit('SET_INFO', response)
        }).catch(() => {

        })
      },
      updateProfile () {
        this.$refs.profileForm.validate(valid => {
          if (valid) {
            this.profileLoading = true
            this.$store.dispatch('updateUserProfile', this.profileForm).then(() => {
              this.profileLoading = false
            }).catch(error => {
              this.profileLoading = false
            })
          } else {
            return false
          }
        })
      },
      updatePassword () {
        this.$refs.pswForm.validate(valid => {
          if (valid) {
            this.passwordLoading = true
            post('/user', {
              oldPassword: this.pswForm.oldPassword,
              newPassword: this.pswForm.newPassword
            }).then(response => {
              this.passwordLoading = false
              Message({
                message: '密码更新成功',
                type: 'success',
                duration: 8 * 1000
              })
              //TODO:
            }).catch(error => {
              this.passwordLoading = false
              Message({
                message: error.message,
                type: 'error',
                duration: 8 * 1000
              })

            })
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

    .head-icon-container {
      width: 3.5rem;
      height: 3.5rem;
    }

    div {
      p:first-child {
      }
    }

  }
</style>
