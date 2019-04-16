<template>
  <div class="login">
    <el-form status-icon="true"
             :label-position="top" label-width="80px"
             :model="loginForm"
             ref="loginForm"
             :role="loginRoles">
      <el-form-item prop="username" label="username">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">Sign in
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" @click.native.prevent="">Sign up</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //import request from ''

  export default {
    data () {
      const validateUsername = (rule, value, callback) => {
        if (/^[A-Za-z]+$/.test(value.trim())) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRoles: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
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
            //TODO: make user know what's wrong
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
