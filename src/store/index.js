import Vue from 'vue';
import Vuex from 'vuex';
import * as product from './modules/product';
import * as user from './modules/user';
import * as order from './modules/order';
import * as shipping from './modules/shipping';
import * as tracking from './modules/tracking';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    product,
    user,
    order,
    shipping,
    tracking
  },

  state: {
    cart: [],
    drawer: false
  },

  mutations: {
    SET_CART: (state) => {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    PUSH_TO_CART: (state, item) => {
      state.cart.push(item);
    },
    REMOVE_FROM_CART: (state, index) => state.cart.splice(index, 1),
    UPDATE_CART_STATE: (state, isOpen) => (state.drawer = isOpen),
    INCREMENT_COUNT: (state, index) => (state.cart[index].quantity += 1),
    DECREMENT_COUNT: (state, index) => (state.cart[index].quantity -= 1)
  },

  actions: {
    // async createCheckout(payload) {
    //   console.log(payload);

    //   try {
    //     const checkoutRes = await serverAPI.postCheckouts(payload);

    //     return checkoutRes.data;
    //   } catch (err) {
    //     throw err.response.data;
    //   }
    // },

    createCart({ commit }) {
      commit('SET_CART');
    },

    addToCart({ commit, state }, item) {
      const isInCart = state.cart.find((cartItem) => cartItem.id === item.id);

      if (isInCart) return item.name;
      commit('PUSH_TO_CART', item);
    },

    removeFromCart({ commit }, index) {
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

    getTotalPrice: (state) => {
      let totalItemPrice = 0;

      state.cart.forEach((item) => {
        totalItemPrice = totalItemPrice + item.price * item.quantity;
      });

      return totalItemPrice;
    }
  }
});

export default store;
