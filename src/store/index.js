import Vue from 'vue';
import Vuex from 'vuex';
import serverAPI from '../mock-server/server.api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    isInCart: false,
    drawer: false,
    user: ''
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    CLEAR_USER: () => {
      localStorage.removeItem('user');
      location.reload();
    },
    SET_PRODUCTS: (state, products) => (state.products = products),
    CREATE_PRODUCT: (state, product) => state.products.push(product),
    UPDATE_PRODUCT: (state, payload) => {
      const product = state.products.find((item) => item.id === payload.id);

      product.image = payload.image ? payload.image : product.image;
      product.name = payload.name ? payload.name : product.name;
      product.description = payload.description
        ? payload.description
        : product.description;
      product.price = payload.price ? payload.price : product.price;
    },
    DELETE_PRODUCT: (state, id) => {
      const product = state.products.find((item) => item.id === id);

      const index = state.products.indexOf(product);

      state.products.splice(index, 1);
    },
    PUSH_TO_CART: (state, item) => state.cart.push(item),
    REMOVE_FROM_CART: (state, index) => state.cart.splice(index, 1),
    INCREMENT_COUNT: (state, index) => (state.cart[index].quantity += 1),
    DECREMENT_COUNT: (state, index) => (state.cart[index].quantity -= 1),
    UPDATE_CART_STATE: (state, isOpen) => (state.drawer = isOpen)
  },

  actions: {
    async registerUser({ commit }, payload) {
      try {
        const user = await serverAPI.postUsers(payload);
        commit('SET_USER', user.data);
      } catch (err) {
        throw err.response.data;
      }
    },

    async loginUser({ commit }, payload) {
      try {
        let user = await serverAPI.postAuth(payload);
        commit('SET_USER', user.data);
        return user.data;
      } catch (err) {
        throw err.response.data;
      }
    },

    logout({ commit }) {
      commit('CLEAR_USER');
    },

    async fetchProducts({ commit }) {
      try {
        const products = await serverAPI.getProducts();
        commit('SET_PRODUCTS', products.data);
      } catch (err) {
        throw err.response.data;
      }
    },

    async createProduct({ commit }, payload) {
      try {
        const product = await serverAPI.postProduct(payload);
        commit('CREATE_PRODUCT', product.data);
      } catch (err) {
        throw err.response.data;
      }
    },

    async updateProduct({ commit }, payload) {
      try {
        const product = await serverAPI.putProduct(payload);
        commit('UPDATE_PRODUCT', product.data);
      } catch (err) {
        throw err.response.data;
      }
    },

    async deleteProduct({ commit }, payload) {
      try {
        const product = await serverAPI.deleteProduct(payload.id);
        commit('DELETE_PRODUCT', product.data.id);
      } catch (err) {
        throw err.response.data;
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
    },

    updateCartState({ commit }, isOpen) {
      commit('UPDATE_CART_STATE', isOpen);
    }
  },

  getters: {
    getCartQuantity: (state) => state.cart.length,
    loggedIn: (state) => !!state.user,
    getUser: (state) => state.user
  },

  modules: {}
});
