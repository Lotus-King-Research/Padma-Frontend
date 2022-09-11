import Vue from "vue";
import Vuex from "vuex";
import nonLktDicList from "@/components/docs/nonLktDicList.json";
import defaultDicList from "@/components/docs/defaultDicList.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    lktSessionStart: false,
    lktPrevList: [],
    options: [...defaultDicList]
  },
  mutations: {
    requestInProgress(state) {
      state.loading = true;
    },

    requestComplete(state) {
      state.loading = false;
    },
    updateLktSession(state, payload) {
      state.lktSessionStart = payload;
    },
    updateDictionary(state, payload) {
      console.log("parload =", payload);
      if (payload.length > 0) {
        state.options.map(a => {
          if (a.id === payload[0].id) {
            a.checked = payload[0].checked;
          }
        });
        if (state.lktSessionStart) {
          localStorage.setItem("lktOptions", JSON.stringify(state.options));
        } else {
          localStorage.setItem("options", JSON.stringify(state.options));
        }
      }
    },
    updateDictionaryList(state, payload) {
      const filterArray = state.options.filter(
        el =>
          el !==
          payload.some(f => {
            return f.name === el.name;
          })
      );
      filterArray.push.apply(filterArray, payload);
      state.options = [...filterArray];
      const finalArray = state.options.filter(val => {
        return !nonLktDicList.find(item => {
          return val.id === item.id;
        });
      });
      state.options = [...finalArray];
    },
    setDicToDefaultList(state, payload) {
      const myArrayFiltered = state.options.filter(el => {
        return !payload.some(f => {
          return f.name === el.name;
        });
      });
      state.options = [...myArrayFiltered];
    },
    storeDicOptions(state, payload) {
      state.options = [...payload];
    },
    partialDicSelection(state, payload) {
      const lktDicOptions = state.options;
      const filteredArray = lktDicOptions.map(el => {
        if (el.name === payload[0].name) {
          el.checked = true;
          return el;
        } else {
          el.checked = false;
          return el;
        }
      });
      state.options = [...filteredArray];
    },
    revertDictionaryList(state) {
      let previousList = [];
      if (state.lktSessionStart) {
        previousList = localStorage.getItem("lktOptions");
      } else {
        previousList = localStorage.getItem("options");
      }
      if (previousList) {
        state.options = [...JSON.parse(previousList)];
      }
    },
    newDicAdded(state, payload) {
      state.options = [...payload];
    }
  },
  actions: {},
  modules: {}
});
