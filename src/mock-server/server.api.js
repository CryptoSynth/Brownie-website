import axios from 'axios';
import store from '../store/index';
import * as user from '../store/modules/user';

const serverApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: false,
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

//get token from server response
serverApi.interceptors.response.use(
  (res) => {
    const token = res.headers['x-auth-token'];

    if (token) {
      store.dispatch('user/setToken', token);
    }

    return res;
  },
  (err) => {
    throw err;
  }
);

//set token from client request
serverApi.interceptors.request.use(
  (req) => {
    const token = user.getters.getToken();

    if (token) {
      req.headers['x-auth-token'] = token;
    }

    return req;
  },
  (err) => {
    throw err;
  }
);

export default {
  //Product API
  getProducts: () => serverApi.get('products/'),
  postProduct: (new_product) => serverApi.post('products/', new_product),
  putProduct: (product_id, update_product) =>
    serverApi.put(`products/${product_id}`, update_product),
  deleteProduct: (product_id) => serverApi.delete(`products/${product_id}`),

  //User API
  postUsers: (newuser) => serverApi.post('users/', newuser),
  getAllUsers: () => serverApi.get('users/'),
  getCurrentUser: () => serverApi.get('users/me/'),
  putCurrentUser: (update_user) => serverApi.put('users/me', update_user),
  postAuth: (user) => serverApi.post('user-auth/', user),
  authenticate: (token) => serverApi.get('admin-auth/', token),

  // postCheckouts: (transaction) => serverApi.post('checkouts/', transaction),

  //Order API
  getOrders: () => serverApi.get('orders/'),

  //Shipping API
  getAllShipping: () => serverApi.get('shipping/shipments/all'),

  //Tracking API
  getAllTracking: () => serverApi.get('tracking/trackers/all')
};
