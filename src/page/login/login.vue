<template>
  <div class="login">
    <el-form id="loginForm"
             status-icon
             label-width="80px"
             :model="loginForm"
             ref="loginForm"
             :rules="loginRoles">
      <el-form-item prop="username" label="用户名">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <!--<router-link to="/register" tag="button">注册</router-link>-->
        <el-button style="width: 100%" @click.native.prevent="redirectToSIgnUp">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {passwordRule, usernameRule} from '@/utils/validator'

  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRoles: {
          username: [{required: true, trigger: 'blur', validator: usernameRule}],
          password: [{required: true, trigger: 'blur', validator: passwordRule}]
        },
        loading: false
      }
    },
    methods: {
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: '/'})
            }).catch(() => {
              this.loading = false
            })
          } else {

            return false
          }
        })
      },
      redirectToSIgnUp () {
        this.$router.push({path: '/register'})
      }
    }
  }
</script>

<style scoped>
  #loginForm {
    width: 90%;
    margin: auto;
  }

  /*@media only screen and (max-width: 768px) {
    #loginForm {
      width: 60%;
    }
  }

  @media only screen and (max-width: 480px) {
    #loginForm {
      width: 80%;
    }
  }*/
</style>
