import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:3000/api/products',
  withCredentials: false,
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export default {
  getProducts() {
    return serverApi.get('/');
  },
  postProduct(product) {
    return serverApi.post(`/`, product);
  },
  putProduct(product) {
    return serverApi.put(`/${product.id}`, product);
  },
  deleteProduct(id) {
    return serverApi.delete(`/${id}`);
  }
};
