import serverAPI from '../../mock-server/server.api';

export const namespaced = true;

export const state = {
  products: []
};

export const mutations = {
  SET_PRODUCTS: (state, products) => (state.products = products),
  CREATE_PRODUCT: (state, product) => state.products.push(product),
  UPDATE_PRODUCT: (state, payload) => {
    const product = state.products.find((item) => item._id === payload._id);

    product.image = payload.image ? payload.image : product.image;
    product.name = payload.name ? payload.name : product.name;
    product.description = payload.description
      ? payload.description
      : product.description;
    product.price = payload.price ? payload.price : product.price;
  },
  DELETE_PRODUCT: (state, id) => {
    const product_index = state.products.findIndex(
      (product) => product._id === id
    );

    state.products.splice(product_index, 1);
  }
};

export const actions = {
  async getProducts({ commit }) {
    try {
      const products = await serverAPI.getProducts();
      commit('SET_PRODUCTS', products.data);
    } catch (err) {
      throw err.response.data;
    }
  },

  async createProduct({ commit }, new_product) {
    delete new_product.id;
    try {
      const product_created = await serverAPI.postProduct(new_product);
      commit('CREATE_PRODUCT', product_created.data);
    } catch (err) {
      throw err.response.data;
    }
  },

  async updateProduct({ commit }, product) {
    const update_product = { ...product };
    delete update_product.id;
    try {
      const product_updated = await serverAPI.putProduct(
        product.id,
        update_product
      );
      commit('UPDATE_PRODUCT', product_updated.data);
    } catch (err) {
      throw err.response.data;
    }
  },

  async deleteProduct({ commit }, product_id) {
    try {
      const product_deleted = await serverAPI.deleteProduct(product_id);
      commit('DELETE_PRODUCT', product_deleted.data._id);
    } catch (err) {
      throw err.response.data;
    }
  }
};
