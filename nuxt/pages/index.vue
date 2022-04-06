<template>
  <div>
    <h1>Hello world!</h1>
    <div>
      <h2>nuxt-link路由导航</h2>
      <nuxt-link to="/about">About</nuxt-link>
    </div>
    <div>
      <h2>编程式路由导航</h2>
      <!-- <nuxt-link to="/user">User</nuxt-link> -->
      <button @click="handleClickToUser">User</button>
    </div>
    <div>
      <h2>动态路由</h2>
      <nuxt-link to="/user/1">User1</nuxt-link>
      <nuxt-link to="/user/2">User2</nuxt-link>
    </div>

    <div>
      <h2>嵌套路由</h2>
      <nuxt-link to="/user/1">User1</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    handleClickToUser() {
      this.$router.push("/user");
    },
  },
};
</script>
