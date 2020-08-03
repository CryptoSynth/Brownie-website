import serverAPI from '../../mock-server/server.api';

export const namespaced = true;

export const state = {
  orders_list: []
};

export const mutations = {
  SET_ORDERS: (state, orders) => (state.orders_list = orders)
};

export const actions = {
  async getOrders({ commit }) {
    try {
      const orders = await serverAPI.getOrders();
      commit('SET_ORDERS', orders.data);
    } catch (err) {
      err.response.data;
    }
  }
};
