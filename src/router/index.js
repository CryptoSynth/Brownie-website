import Vue from 'vue';
import VueRouter from 'vue-router';
// import axios from 'axios';

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
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/Checkout'),
    children: [
      {
        path: 'successful-payment',
        name: 'successful-payment',
        component: () => import('../views/ThankYou')
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
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound')
  },
  {
    path: '*',
    redirect: { name: '404' }
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

  if (
    to.matched.some((record) => record.meta.isAdmin && (!user || !user.isAdmin))
  ) {
    return next({ path: '/' });
  }

  // axios.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response.status === 401) {
  //       this.$store.dispatch('logout');
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  next();
});

export default router;
