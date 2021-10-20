<template>
  <div>
    <div id="nav">
      <button @click="provideMitt">点击</button>
      <mitt-content></mitt-content>
    </div>
  </div>
</template>

<script>
import MittContent from "./views/mitt/MittContent.vue";
import emitter from "./views/mitt/emitter";
import { defineComponent } from "vue";

const App = defineComponent({
  components: { MittContent },
  methods: {
    provideMitt() {
      console.log("111");
      emitter.emit("foo", { a: "b" });
    },
  },
});
export default App;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
