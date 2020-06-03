const actions = {
  addStock({ commit }, stock) {
    commit('ADD_STOCK', stock);
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
