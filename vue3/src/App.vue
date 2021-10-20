<template>
  <div>
    <ref-demo></ref-demo>
  </div>
</template>

<script>
import RefDemo from '../examples/RefDemo.vue'
import { defineComponent } from "vue";

const App = defineComponent({
  components: { RefDemo },
  methods: {
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
