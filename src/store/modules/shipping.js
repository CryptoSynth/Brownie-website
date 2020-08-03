import serverAPI from '../../mock-server/server.api';

export const namespaced = true;

export const state = {
  shipping_list: []
};

export const mutations = {
  SET_ALL_SHIPPING: (state, shippings) => (state.shipping_list = shippings)
};

export const actions = {
  async getAllShipping({ commit }) {
    try {
      const shipping = await serverAPI.getAllShipping();
      commit('SET_ALL_SHIPPING', shipping.data);
    } catch (err) {
      throw err.response.data;
    }
  }
};
