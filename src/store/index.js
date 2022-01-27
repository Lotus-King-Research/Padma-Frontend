import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    options: [
      { id: 0, name: "Mahavyutpatti", checked: true },
      { id: 1, name: "Erik pema kunsang", checked: true },
      { id: 2, name: "Ives waldo", checked: true },
      { id: 3, name: "Jeffrey hopkins", checked: true },
      { id: 4, name: "Lobsang monlam", checked: true },
      { id: 5, name: "Tibetan multi", checked: true },
      { id: 6, name: "Tibetan medicine", checked: true },
      { id: 7, name: "Verb lexicon", checked: true }
    ]
  },
  mutations: {
    requestInProgress(state) {
      state.loading = true;
    },

    requestComplete(state) {
      state.loading = false;
    },
    updateDictionary(state, payload) {
      if (payload.length > 0) {
        state.options[payload[0].id].checked = payload[0].checked;
        localStorage.setItem("options", JSON.stringify(state.options));
      }
    },
    storeDicOptions(state, payload) {
      state.options = [...payload];
    }
  },
  actions: {},
  modules: {}
});
