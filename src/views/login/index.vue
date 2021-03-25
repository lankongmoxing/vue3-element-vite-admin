<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">
        运营后台
      </h3>
      <div class="login">
        <div class="left">
          <img src="./../../assets/login_bg.png">
        </div>
        <div class="right">
          <h3 class="sub-title">
            登录
          </h3>
          <el-form-item
            prop="username"
            class="form-item"
          >
            <span class="svg-container">
              <svg-icon name="user" />
            </span>
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              placeholder="username"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            class="form-item"
          >
            <span class="svg-container">
              <svg-icon name="password" />
            </span>
            <el-input
              v-model="loginForm.password"
              :type="pwdType"
              name="password"
              auto-complete="on"
              placeholder="password"
            />
            <span
              class="show-pwd"
              @click="showPwd"
            >
              <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
            </span>
          </el-form-item>
          <el-form-item class="login-button">
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;"
              @click.prevent="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
          <div class="tips">
            ————— <span style="color: #909399;">找回密码等事宜，请联系技术部</span> —————
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const validateUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const loginForm = reactive({
      username: '',
      password: ''
    })

    const loginRules = {
      username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      password: [{ required: true, trigger: 'blur', validator: validatePass }]
    }

    const pwdType = ref('password')

    // 修改密码 input type
    const showPwd = () => {
      if (pwdType.value === 'password') {
        pwdType.value = ''
      } else {
        pwdType.value = 'password'
      }
    }

    const loading = ref(false)

    const formRef = ref<any>(null)
    // 登录操作
    const handleLogin = () => {
      formRef.value.validate().then(() => {
        loading.value = true
        store.dispatch('user/Login', loginForm).then(() => {
          loading.value = false
          router.push({ path: '/' })
        }).catch(() => {
          loading.value = false
        })
      })
    }

    return {
      loginForm,
      loginRules,
      pwdType,
      showPwd,
      handleLogin,
      loading,
      formRef
    }
  }
})
</script>

<style lang="scss">
@import "src/styles/_variables.scss";

.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      // color: $lightGray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $white inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $white inset !important;
        -webkit-text-fill-color: rgba(0, 0, 0, 0.8) !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/_variables.scss";

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 820px;
    height: 550px;
    max-width: 100%;
    margin-top: -275px;
    margin-left: -410px;
    .login {
      width: 100%;
      height: 454px;
      overflow: hidden;
      border-radius: 10px;
      background: $white;
      .left,
      .right {
        float: left;
        width: 50%;
        height: 100%;
        img {
          width: 336px;
          margin: 68px 37px;
        }
      }
      .left {
        background: rgba(64, 158, 255, 0.8);
      }
      .right {
        .sub-title {
          text-align: center;
          font-size: 24px;
          color: rgba(48, 49, 51, 1);
          margin-top: 70px;
          margin-bottom: 40px;
        }
      }
    }
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid rgba(245, 245, 245, 1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    // color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #ebeef5;
    margin-bottom: 10px;
    text-align: center;
    margin-top: 20px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 3px 5px 3px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 36px;
    font-weight: 400;
    color: $white;
    margin: 0px auto 60px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .form-item {
    width: 350px;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .login-button {
    width: 350px;
    height: 46px;
    margin: 0 auto;
    .el-button {
      font-size: 16px;
    }
  }
}
</style>
