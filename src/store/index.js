import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    options: [
      { id: 0, name: "Mahavyutpatti", checked: false },
      { id: 1, name: "Erik pema kunsang", checked: false },
      { id: 2, name: "Ives waldo", checked: false },
      { id: 3, name: "Jeffrey hopkins", checked: false },
      { id: 4, name: "Lobsang monlam", checked: false },
      { id: 5, name: "Tibetan multi", checked: false },
      { id: 6, name: "Tibetan medicine", checked: false },
      { id: 7, name: "Verb lexicon", checked: false }
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
