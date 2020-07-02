import axios from 'axios';

let serverApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: false,
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export default {
  getProducts: () => serverApi.get('products/'),
  postProduct: (product) => serverApi.post('products/', product),
  putProduct: (product) => serverApi.put(`products/${product.id}`, product),
  deleteProduct: (id) => serverApi.delete(`products/${id}`),
  postUsers: (newuser) => serverApi.post('users/', newuser),
  postAuth: (user) => serverApi.post('auth/', user),
  postCheckouts: (transaction) => serverApi.post('checkouts/', transaction),
  getOrders: () => serverApi.get('orders/'),
  getOrder: (orderId) => serverApi.get(`orders/${orderId}`)
};
