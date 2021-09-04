import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "vue-select/dist/vue-select.css";

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import(/* webpackPreload: true */ "typeface-jomolhari/index.css");

import Toasted from "vue-toasted";
Vue.use(Toasted);

// Font-awesome 5
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDoubleRight,
  faArrowCircleLeft
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDoubleRight);
library.add(faArrowCircleLeft);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
