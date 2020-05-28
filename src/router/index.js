import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home')
  },
  {
    path: '/user-account',
    name: 'user',
    component: () => import('../views/User')
  },
  {
    path: '/admin-account',
    name: 'admin',
    component: () => import('../views/Admin'),
    children: [
      {
        path: 'profile',
        component: () => import('../views/AdminProfile')
      },
      {
        path: 'products',
        component: () => import('../views/AdminProducts')
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
