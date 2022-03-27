import App from "./App.vue";
import Varlet from "@varlet-vue2/ui";
import Vue from "vue";
import "@varlet-vue2/ui/es/style.js";
import VueRouter from "vue-router";
import router from "./routes";

Vue.use(VueRouter);

Vue.use(Varlet);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
