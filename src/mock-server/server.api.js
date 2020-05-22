import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export default {
  getProducts() {
    return serverApi.get('/products');
  }
};
