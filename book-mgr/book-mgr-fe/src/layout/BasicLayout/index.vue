<template>
  <div class="basic-layout">
      <div class="app-header">
          <div class="left">
              <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
              <div class="title">图书管理系统</div>
          </div>
          <div class="right">
              <div class="hello-msg">你好，{{ store.userInfo.account }}</div>
              <div class="logout" @click="logout">退出</div>
          </div>
      </div>
      <div class="app-header-placeholder"></div>
      <div class="app-content">
          <div class="left">
              <app-nav />
          </div>
          <div class="right">
              <router-view />
          </div>
      </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>

