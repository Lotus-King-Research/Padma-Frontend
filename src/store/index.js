import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    requestInProgress(state) {
      state.loading = true;
    },

    requestComplete(state) {
      state.loading = false;
    }
  },
  actions: {},
  modules: {}
});
