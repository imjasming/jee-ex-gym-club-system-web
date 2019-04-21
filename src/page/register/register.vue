<template>
  <div class="form-container">
    <el-form id="registerForm" class="input-form"
             status-icon
             label-width="80px"
             :model="registerForm"
             ref="registerForm"
             :rules="registerRules">
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
    methods: {
      handleRegister () {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('register', this.registerForm).then(() => {
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
        this.$route.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>
  #registerForm {
    margin: auto;
  }

</style>
