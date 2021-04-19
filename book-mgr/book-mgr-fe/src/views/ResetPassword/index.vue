<template>
  <div>
    <a-card title="重置密码申请列表">
      <a-table bordered :data-source="list" :columns="columns">
        <template #actions="{record}">
          <a-button size="small" type="primary" @click="changeStatus(record, 2)">重置</a-button>
          &nbsp;
          <a-button size="small" @click="changeStatus(record, 3)">忽略</a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>
