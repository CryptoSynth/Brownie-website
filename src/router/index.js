import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/HomeLogin')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('../components/HomeSignUp')
      }
    ]
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
    meta: { isAdmin: true },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/AdminProfile')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/AdminProducts')
      },
      {
        path: 'orders',
        name: 'orders',
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

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  if (to.matched.some((record) => record.meta.isAdmin && !user.isAdmin)) {
    return next({ path: '/' });
  }

  next();
});

export default router;
