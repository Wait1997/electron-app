import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '@renderer/layouts/index.vue';
import Home from '@renderer/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: Home
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
