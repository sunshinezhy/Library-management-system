<template>
  <div>
    <a-card v-only-admin>
      <h2>用户管理</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据账户搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
        <a-button @click="showAddModal = true">添加用户</a-button>
      </space-between>

      <a-divider />

      <div>
        <a-table bordered :columns="columns" :data-source="list">
          <template #createdAt="{record}">
            {{ formatTimestamp(record.meta.createdAt) }}
          </template>

          <template #character="{record}">
            {{ getCharacterInfoById(record.character).title }}
          </template>

          <template #actions="{record}">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a>
            &nbsp;
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
    </a-card>
    <add-one v-model:show="showAddModal" @getList="getUser" />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
