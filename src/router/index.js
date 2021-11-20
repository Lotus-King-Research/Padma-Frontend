import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dictionary_lookup",
      name: "mainview",
      component: require("@/components/MainView").default,
      children: [
        // {
        //   path: "home",
        //   name: "landing",
        //   component: require("@/components/Pages/Landing").default
        // },
        {
          path: "home",
          name: "home",
          component: require("@/components/Pages/default").default
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
          // component: () => import("@/components/Pages/SearchTexts")
        },
        {
          path: "render_text",
          name: "rendertext",
          component: require("@/components/Pages/RenderText").default
        },
        {
          path: "find_similar",
          name: "similarwords",
          component: require("@/components/Pages/SimilarWords").default
        },
        {
          path: "tokenize",
          name: "tokenize",
          component: require("@/components/Pages/Tokenize").default
        },
        {
          path: "word_statistics",
          name: "wordstatistics",
          component: require("@/components/Pages/WordStatistics").default
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
