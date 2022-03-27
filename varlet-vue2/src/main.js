import App from "./App.vue";
import Varlet from "@varlet-vue2/ui";
import Vue from "vue";
import "@varlet-vue2/ui/es/style.js";

Vue.use(Varlet);

new Vue({
  render: h => h(App),
}).$mount("#app");
