import VueRouter from "vue-router";
import Demo from "./examples/demo.vue";
import Dark from "./examples/dark.vue";
import List from "@/components/list";

const routes = [
  { path: "/", component: List },
  { path: "/demo", component: Demo },
  { path: "/dark", component: Dark },
];

export default new VueRouter({
  routes,
});
