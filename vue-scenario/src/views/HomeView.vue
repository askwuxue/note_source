<template>
  <div class="home">
    <h1>this is A page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {},
  created() {
    console.log('Home created ...')
  },
  mounted() {
    console.log('Home mounted ...')
  },
  activated() {
    console.log('Home activated ...')
  },
  deactivated() {
    console.log('Home deactivated ...')
  },
}
</script>
