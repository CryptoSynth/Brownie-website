import serverAPI from '../../mock-server/server.api';

export const namespaced = true;

export const state = {
  orders_list: [],
  fullfilled: false
};

export const mutations = {
  SET_ORDERS: (state, orders) => (state.orders_list = orders),
  SET_ORDER_STATUS: (state, order_status) => (state.fullfilled = order_status)
};

export const actions = {
  async getOrders({ commit }) {
    try {
      const orders = await serverAPI.getOrders();
      commit('SET_ORDERS', orders.data);
    } catch (err) {
      err.response.data;
    }
  },

  async fullfillOrder({ commit }, order_id) {
    try {
      const order_status = await serverAPI.postFullfillment(order_id);
      commit('SET_ORDER_STATUS', order_status.data);
    } catch (err) {
      console.log(err);
    }
  }
};
