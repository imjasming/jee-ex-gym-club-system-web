<template>
  <div id="profile">
    <el-card shadow="never">
      <div class="user-profile">
        <div class="dp-in-bl head-icon-container">
          <img class="round-head-icon" :src="serverUrl + '/img/head.png'">
        </div>
        <div class="dp-in-bl">
          <p class="prim-text">{{username}}</p>
          <p class="sub-text">email: {{userEmail}}</p>
        </div>
      </div>
    </el-card>

    <el-card shadow="never">
      <el-table
        :data="oauthBindList"
        style="width: 100%">
        <el-table-column
          prop="provider"
          label="第三方账户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.status">
              <p class="dp-in-bl">已绑定</p>
              <el-button class="dp-in-bl" type="text" @click="oauthRemoveBind(scope.row.provider)">解绑</el-button>
            </div>
            <div v-else>
              <p class="dp-in-bl">未绑定</p>
              <el-button class="dp-in-bl" type="text" @click="oauthBind(scope.row.provider)">绑定</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    <el-card shadow="never">
      <el-button type="danger" @click="logout">退出登录</el-button>
    </el-card>
  </div>
</template>

<script>
  import {del, fetch, post} from '@/utils/axios'
  import {emailRule, passwordRule} from '@/utils/validator'
  import {Message} from 'element-ui'
  import {serverUrl} from '@/utils/axios'

  export default {
    data () {
      const repasswordRule = (rule, value, callback) => {
        if (this.pswForm.newPassword !== value) {
          callback(new Error('两次密码不相同！'))
        }
        return passwordRule(rule, value, callback)
      }
      return {
        oauthBindList: [],
        serverUrl: serverUrl,
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
      },
      userEmail () {
        let userInfo = this.userInfo()
        return userInfo ? (userInfo.email ? userInfo.email : '未设置') : ''
      },
      username () {
        let userInfo = this.userInfo()
        return userInfo ? userInfo.username : ''
      }
    },
    created () {
      this.fetchOauthBind()
    },
    methods: {
      oauthBind (provider) {
        post(`/connect/${provider}`).then(data => {
          //Message.success('绑定成功')
          fetch(data).then(data => {

          }).catch(error => {

          })
        }).catch(error => {
          Message.error(`绑定失败${error.message}`)
        })
      },
      oauthRemoveBind (provider) {
        del(`/connect/${provider}`).then(data => {
          Message.success('解绑成功')
        }).catch(error => {
          Message.error(`解绑失败${error.message}`)
        })
      },

      fetchOauthBind () {
        fetch('connect').then(data => {
          if (data != null) {
            this.oauthBindList = data
          }
        }).catch(error => {

        })
      },
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
            post('/user/reset-password', {
              oldPassword: this.pswForm.oldPassword,
              newPassword: this.pswForm.newPassword
            }).then(response => {
              this.passwordLoading = false
              let message = ''
              if (response.data == null || !response.data) {
                message = '密码验证失败'
              } else {
                message = '密码更新成功'
              }
              Message({
                message: message,
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
      },
      logout () {
        this.$store.dispatch('logout').then(() => {
          location.reload()
        })
      }
    },
    components: {},
  }
</script>

<style lang="scss" scoped>
  .user-profile {
    display: inline-block;

    .head-icon-container {
      width: 3.5rem;
      height: 3.5rem;
    }

    div {
      p:first-child {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
      }
    }

  }
</style>
