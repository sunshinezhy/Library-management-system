<template>
  <div>
    <a-card title="修改密码">
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="旧密码">
          <a-input type="password" v-model:value="resetPasswordForm.oldPassword" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input type="password" v-model:value="resetPasswordForm.newPassword" />
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input type="password" v-model:value="resetPasswordForm.confirmNewPassword" />
          <div style="margin-top: 24px;">
            <a-button @click="resetPassword" type="primary">修改</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>
