import Vue from 'vue';
import Vuex from 'vuex';
import serverAPI from '../mock-server/server.api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    isInCart: false
  },

  mutations: {
    SET_PRODUCTS: (state, products) => (state.products = products),
    PUSH_TO_CART: (state, item) => state.cart.push(item),
    REMOVE_FROM_CART: (state, index) => state.cart.splice(index, 1),
    INCREMENT_COUNT: (state, index) => (state.cart[index].quantity += 1),
    DECREMENT_COUNT: (state, index) => (state.cart[index].quantity -= 1)
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const products = await serverAPI.getProducts();
        commit('SET_PRODUCTS', products.data);
      } catch (err) {
        throw err.response;
      }
    },

    addToCart({ commit, state }, item) {
      if (state.cart.length === 0) return commit('PUSH_TO_CART', item);

      state.isInCart = state.cart.some((cartItem) => {
        return cartItem.id === item.id;
      });

      if (!state.isInCart) commit('PUSH_TO_CART', item);
    },

    removeFromCart({ commit, state }, index) {
      state.isInCart = false;
      commit('REMOVE_FROM_CART', index);
    },

    add: ({ commit }, index) => commit('INCREMENT_COUNT', index),

    sub: ({ commit, state }, index) => {
      if (state.cart[index].quantity <= 1) return state.cart[index].quantity;
      commit('DECREMENT_COUNT', index);
    }
  },

  modules: {},

  getters: {
    getCartQuantity: (state) => state.cart.length
  }
});
