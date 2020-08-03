import serverAPI from '../../mock-server/server.api';

export const namespaced = true;

export const state = {
  tracking_list: []
};

export const mutations = {
  SET_ALL_TRACKING: (state, user_tracking) =>
    (state.tracking_list = user_tracking)
};

export const actions = {
  async getAllTracking({ commit }) {
    try {
      const tracking = await serverAPI.getAllTracking();
      commit('SET_ALL_TRACKING', tracking.data);
    } catch (err) {
      throw err.response.data;
    }
  }
};
