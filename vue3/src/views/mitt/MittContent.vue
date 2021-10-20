<template>
  <div>2222</div>
</template>
<script>
import emitter from "./emitter";

export default {
  methods: {},
  created() {
    console.log("333");
    emitter.on("foo", (e) => {
      console.log(" e: ", e);
    });
  },
};
</script>
<style scoped></style>
