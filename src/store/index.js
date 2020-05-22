import Vue from 'vue';
import Vuex from 'vuex';
import serverAPI from '../mock-server/server.api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },

  mutations: {
    SET_PRODUCTS: (state, products) => (state.products = products)
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const products = await serverAPI.getProducts();
        commit('SET_PRODUCTS', products.data);
      } catch (err) {
        throw err.response;
      }
    }
  },

  modules: {}
});
