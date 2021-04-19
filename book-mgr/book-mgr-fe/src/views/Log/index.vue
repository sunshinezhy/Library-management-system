<template>
  <div>
    <a-card v-only-admin :title="simple ? '最近的操作日志' : ''">
      <div v-if="!simple">
        <h2>操作日志</h2>

        <a-divider />
      </div>

      <div>
        <a-table :columns="columns" :data-source="list" bordered>
          <template #createdAt="{record}">
            {{ formatTimestamp(record.meta.createdAt) }}
          </template>
          <template #action="{record}">
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>
