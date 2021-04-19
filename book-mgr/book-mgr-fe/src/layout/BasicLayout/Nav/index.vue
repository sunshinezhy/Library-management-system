<template>
  <div>
    <a-menu
      style="width: 100%"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      v-for="item in menu"
      :key="item.url"
      v-only-admin="item.onlyAdmin"
    >
      <a-sub-menu v-if="item.children">
        <template #title>
          <span>
            <MailOutlined />
            <span>{{ item.title }}</span>
          </span>
        </template>

        <a-menu-item v-for="child in item.children" :key="child.url" @click="to(child.url)">
          {{ child.title }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item @click="to(item.url)" :key="item.url" v-else>
        {{ item.title }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
