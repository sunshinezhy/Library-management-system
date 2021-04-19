<template>
  <div>
    <a-card title="邀请码管理">
      <div>
        <a-input-number v-model:value="count" :min="1" :max="10000" />
        &nbsp;
        <a-button type="primary" @click="add">添加邀请码</a-button>
      </div>

      <a-divider />

      <div>
        <a-table bordered :columns="columns" :data-source="list">
          <template #status="{record}">
            {{ record.user ? "已使用" : "未使用" }}
          </template>

          <template #actions="{record}">
            <a-button type="danger" size="small" @click="remove(record)">删除</a-button>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>
