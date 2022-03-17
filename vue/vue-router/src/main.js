import Vue from "vue";
import App from "./App.vue";
// import VueRouter from "./VueRouter/index";
import VueRouter from "./VueRouter/indexHash";
// import VueRouter from "vue-router";
import Index from "@/components/index";
import About from "@/components/about";
import That from "@/components/that";

Vue.config.productionTip = false;

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "index",
        component: Index,
      },
      {
        path: "that",
        // name: 'that',
        component: That,
      },
    ],
  },
  {
    path: "about",
    component: About,
  },
];
// VueRouter 插件
// 1. 实现并声明了两个组件，router-view router-link
// 2. install
Vue.use(VueRouter);
const router = new VueRouter({ routes });

let vm = new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
console.log("vm: ", vm);
