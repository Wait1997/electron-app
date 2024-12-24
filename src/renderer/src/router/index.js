import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '@renderer/layouts/index.vue';

const Chat = () => import('@renderer/views/Chat.vue');
const Login = () => import('@renderer/views/Login.vue');
const NotFound = () => import('@renderer/views/NotFound.vue');

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: Chat
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 路由守卫
// router.beforeEach(async (to) => {
//   const token = localStorage.getItem('token');
//   if (!token && to.path !== '/login') {
//     return { name: 'Login', query: { redirect: to.fullPath } };
//   }
//   return true;
// });

export default router;
