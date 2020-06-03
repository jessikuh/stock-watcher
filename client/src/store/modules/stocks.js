const actions = {
  addStock({ commit }, stock) {
    commit('ADD_STOCK', stock);
  },
  removeStock({ commit }, index) {
    commit('REMOVE_STOCK', index);
  },
};

const mutations = {
  ADD_STOCK(state, stock) {
    const stockExists = (value) => {
      state.stocks.some((el) => el.symbol === value.symbol);
    };

    if (stockExists(stock)) {
      return;
    }

    state.stocks.push(stock);
  },
  REMOVE_STOCK(state, index) {
    state.stocks.splice(index, 1);
  },
};

const state = {
  stocks: [],
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
