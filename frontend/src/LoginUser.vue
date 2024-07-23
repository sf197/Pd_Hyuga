<template>
  <div class="login">
    <!-- 登录表单内容 -->
    <h1>登录</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="username" placeholder="用户名" />
      <input type="password" v-model="password" placeholder="密码" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // 处理登录逻辑
      console.log('用户名:', this.username);
      console.log('密码:', this.password);
      // 这里可以添加实际的登录请求
    },
  },
});
</script>

<style>
/* 添加一些基本的样式 */
.login {
  max-width: 300px;
  margin: auto;
}
input, button {
  margin-bottom: 15px;
}
</style>