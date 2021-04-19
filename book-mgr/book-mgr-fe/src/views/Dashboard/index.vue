<template>
  <div>
    <a-card>
      <div class="list">
        <div class="item">
          <div class="count">共 {{ baseInfo.total.book }} 本</div>
          <div class="title">书籍</div>
        </div>
        <div class="item">
          <div class="count">共 {{ baseInfo.total.user }} 位</div>
          <div class="title">用户</div>
        </div>
        <div class="item">
          <div class="count">共 {{ baseInfo.total.log }} 条</div>
          <div class="title">日志</div>
        </div>
      </div>
    </a-card>

    <div class="table-list">
      <div class="left">
        <book simple />
      </div>
      <div class="right">
        <log simple />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
