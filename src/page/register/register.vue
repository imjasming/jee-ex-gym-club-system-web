<template>
  <div class="form-container">
    <el-card class="box-card title-pane">
      <div slot="header" class="clearfix">
      </div>
      <div class="text item">
        <span>{{title}}</span>
      </div>
    </el-card>
    <el-form id="registerForm" class="input-form"
             status-icon
             label-width="80px"
             :model="registerForm"
             ref="registerForm"
             :rules="registerRules">
      <el-form-item>
        <el-alert v-if="responseMessage && responseMessage !== ''" :title="responseMessage" type="error"></el-alert>
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input type="text" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input type="text" v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="registerForm.repassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleRegister">注册
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" @click.native.prevent="redirectToLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {emailRule, passwordRule, usernameRule} from '@/utils/validator'

  export default {
    data () {
      const repasswordRule = (rule, value, callback) => {
        if (this.registerForm.password !== value) {
          callback(new Error('两次密码不相同！'))
        }
        return passwordRule(rule, value, callback)
      }

      return {
        responseMessage: '',
        bindKey: '',
        title: '注册一个账号吧',
        loading: false,
        registerForm: {
          username: '',
          email: '',
          password: '',
          repassword: '',
        },
        registerRules: {
          username: [{trigger: 'blur', validator: usernameRule}],
          email: [{trigger: 'blur', validator: emailRule}],
          password: [{trigger: 'blur', validator: passwordRule}],
          repassword: [{trigger: 'blur', validator: repasswordRule}],

        }
      }
    },
    created () {
      this.initTitle()
    },
    methods: {
      initTitle () {
        this.bindKey = this.$route.query.key
        if (this.bindKey) {
          this.title = '初始化绑定账户'
        }
      },
      handleRegister () {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            let dispatchTo = 'register'

            if (this.bindKey && this.bindKey !== '') {
              this.registerForm.key = this.bindKey
              dispatchTo = 'socialBind'
            }

            this.$store.dispatch(dispatchTo, this.registerForm).then(data => {
              this.loading = false
              this.$router.push({path: '/login'})
            }).catch(() => {
              this.loading = false
            })
          } else {
            //TODO: make user know what's wrong
            return false
          }
        })
      },
      redirectToLogin () {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>
  #registerForm {
    margin: auto;
  }

</style>
