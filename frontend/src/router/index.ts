// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import IndexHome from '../IndexHome.vue';
import Login from '../LoginUser.vue'; // 导入登录组件

const routes = [
    {
      path: '/loginsubmit',
      component: Login
    },
    {
        path: '/', 
        component: IndexHome
    },
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;