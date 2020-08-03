import Vue from 'vue';
import VueRouter from 'vue-router';
import serverAPI from '../mock-server/server.api';
import * as user from '../store/modules/user';

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
        path: 'successful-payment/:orderId',
        name: 'successful-payment',
        props: true,
        component: () => import('../views/ThankYou')
      }
    ]
  },

  {
    path: '/user-account',
    name: 'user',
    component: () => import('../views/User'),
    children: [
      {
        path: 'profile',
        name: 'user-profile',
        component: () => import('../views/UserProfile')
      },
      {
        path: 'orders',
        name: 'user-orders',
        component: () => import('../views/UserOrders')
      }
    ]
  },

  {
    path: '/admin-account',
    name: 'admin',
    component: () => import('../views/Admin'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import('../views/AdminProfile')
      },
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('../views/AdminProducts')
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('../views/AdminOrders')
      },
      {
        path: 'shipped',
        name: 'admin-shipped-orders',
        component: () => import('../views/AdminShippedOrders')
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

router.beforeEach(async (to, from, next) => {
  const token = user.getters.getToken();
  const isRequired = to.matched.some((record) => record.meta.requiresAuth);

  //token is valid and authorization is required
  if (isRequired) {
    if (token) {
      try {
        const isAuth = await serverAPI.authenticate(token);
        if (isAuth.data.isAdmin) {
          next();
        }
      } catch (err) {
        if (err.response.data.isNotAdmin || err.response.data) {
          next('/user-account');
        }
      }
    } else {
      console.log('Access Denied. No Token provided.');
      next('/');
    }
  } else {
    next();
  }

  // serverApi.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response.status === 401) {
  //       this.$store.dispatch('logout');
  //     }
  //     return Promise.reject(error);
  //   }
  // );
});

export default router;
