<template>
  <div id="app">
    <nav>
      <router-link to="/">to A page</router-link>
      |
      <router-link to="/about">to B page</router-link>
    </nav>
    <!-- 需要缓存的视图 -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import AboutView from '@/views/AboutView'
// import HomeView from '@/views/HomeView'

export default {
  components: {
    // AboutView,
    // HomeView,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
