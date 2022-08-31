import Vue from "vue";
import Vuex from "vuex";
import nonLktDicList from "@/components/docs/nonLktDicList.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    lktSessionStart: false,
    options: [
      { id: 0, name: "Mahavyutpatti", value: "Mahavyutpatti", checked: true },
      {
        id: 1,
        name: "Erik pema kunsang",
        value: "Erik_pema_kunsang",
        checked: true
      },
      { id: 2, name: "Ives waldo", value: "Ives_waldo", checked: true },
      {
        id: 3,
        name: "Jeffrey hopkins",
        value: "Jeffrey_hopkins",
        checked: true
      },
      { id: 4, name: "Lobsang monlam", value: "Lobsang_monlam", checked: true },
      { id: 5, name: "Verb lexicon", value: "Verb_lexicon", checked: true },
      { id: 6, name: "Tibetan multi", value: "Tibetan_multi", checked: true },
      {
        id: 7,
        name: "Tibetan medicine",
        value: "Tibetan_medicine",
        checked: true
      }
    ]
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
      if (payload.length > 0) {
        state.options[payload[0].id].checked = payload[0].checked;
        localStorage.setItem("options", JSON.stringify(state.options));
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
      // const delArray = [
      //   {
      //     id: 1,
      //     name: "Erik pema kunsang",
      //     value: "Erik_pema_kunsang",
      //     checked: true
      //   },
      //   { id: 2, name: "Ives waldo", value: "Ives_waldo", checked: true },
      //   {
      //     id: 3,
      //     name: "Jeffrey hopkins",
      //     value: "Jeffrey_hopkins",
      //     checked: true
      //   },
      //   {
      //     id: 4,
      //     name: "Lobsang monlam",
      //     value: "Lobsang_monlam",
      //     checked: true
      //   }
      // ];
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
      const filteredArray = state.options.map(el => {
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
      const previousList = localStorage.getItem("options");
      if (previousList !== "") {
        state.options = [...JSON.parse(previousList)];
      }
    }
  },
  actions: {},
  modules: {}
});
