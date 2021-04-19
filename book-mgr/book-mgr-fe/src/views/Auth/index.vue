<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img
        src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
        alt=""
      />
      <h2 class="title">图书管理系统 后台</h2>
    </div>

    <div class="form">
      <a-tabs>
        <!-- 登录 -->
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input size="large" placeholder="账号" v-model:value="loginForm.account" />
          </div>

          <div class="item">
            <a-input size="large" type="password" placeholder="密码" v-model:value="loginForm.password" />
          </div>

          <div class="item">
            <a href="javascript:;" @click="forgetPassword">忘记密码</a>
          </div>

          <div class="item">
            <a-button size="large" type="primary" @click="login">
              登录
            </a-button>
          </div>
        </a-tab-pane>
        <!-- 注册 -->
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input size="large" placeholder="账号" v-model:value="regForm.account" />
          </div>

          <div class="item">
            <a-input size="large" type="password" placeholder="密码" v-model:value="regForm.password" />
          </div>

          <div class="item">
            <a-input size="large" placeholder="邀请码" v-model:value="regForm.inviteCode" />
          </div>

          <div class="item">
            <a-button @click="register" size="large" type="primary">
              注册
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
