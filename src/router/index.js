import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {});
};

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
          path: "lkt",
          name: "lkt",
          component: require("@/components/Pages/DictionaryLookup").default
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
