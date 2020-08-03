import serverAPI from '../../mock-server/server.api';

export const namespaced = true;

export const state = {
  user: '',
  current_user: '',
  token: ''
};

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  SET_CURRENT_USER: (state, current_user) => {
    state.current_user = current_user;
  },
  CLEAR_USER: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    location.reload();
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    localStorage.setItem('jwt_token', JSON.stringify(token));
  }
};

export const actions = {
  async registerUser({ commit }, payload) {
    try {
      const new_user = await serverAPI.postUsers(payload);
      commit('SET_USER', new_user.data);
    } catch (err) {
      console.log(err);
      throw err.response.data;
    }
  },

  async loginUser({ commit }, payload) {
    try {
      let user = await serverAPI.postAuth(payload);
      commit('SET_USER', user.data);
    } catch (err) {
      throw err.response.data;
    }
  },

  logout({ commit }) {
    commit('CLEAR_USER');
  },

  async getCurrentUser({ commit }) {
    try {
      const current_user = await serverAPI.getCurrentUser();
      commit('SET_CURRENT_USER', current_user.data);
    } catch (err) {
      throw err.response.data;
    }
  },

  async updateCurrentUser({ commit }, update) {
    try {
      const updated_user = await serverAPI.putCurrentUser(update);
      commit('SET_CURRENT_USER', updated_user.data);
      return true;
    } catch (err) {
      throw err.response.data;
    }
  },

  setToken({ commit }, token) {
    commit('SET_TOKEN', token);
  }
};

export const getters = {
  loggedIn: (state) => !!state.user,
  getUser: () => JSON.parse(localStorage.getItem('user')),
  getToken: () => JSON.parse(localStorage.getItem('jwt_token'))
};
