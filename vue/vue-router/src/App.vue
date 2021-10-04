<template>
  <div id="app">
    <router-link to="/index">Go to Index</router-link> |
    <router-link to="/about">Go to About</router-link> |
    <router-link to="/that">Go to That</router-link>
    <div class="main">
      <!-- 路由出口 -->
      <!-- 利用vue响应式: current -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  margin: 10px auto;
  width: 500px;
  /* height: 200px; */
  color: #fff;
  background-color: purple;
  text-align: center;
  /* line-height: 200px; */
}
</style>
