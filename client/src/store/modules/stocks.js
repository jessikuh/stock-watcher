const actions = {
  addStock({ commit }, stock) {
    commit('ADD_STOCK', stock);
  },
};

const getters = {};

const mutations = {
  ADD_STOCK(state, stock) {
    state.stocks.push(stock);
  },
};

const state = {
  stocks: [],
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
