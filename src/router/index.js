import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
      name: "mainview",
      component: require("@/components/MainView").default,
      children: [
        {
          path: "home",
          name: "landing",
          component: require("@/components/Pages/Landing").default
        },
        {
          path: "dictionary_lookup",
          name: "dictionarylookup",
          component: require("@/components/Pages/DictionaryLookup").default
        },
        {
          path: "search_texts",
          name: "searchtexts",
          component: require("@/components/Pages/SearchTexts").default
        },
        {
          path: "render_text",
          name: "rendertext",
          component: require("@/components/Pages/RenderText").default
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
