// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Login from '../LoginUser.vue'; // 导入登录组件

const routes = [
  { path: '/loginsubmit', component: Login },
  // 其他路由...
  { path: '*', redirect: '/' }, // 未匹配路径重定向到根路径
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;