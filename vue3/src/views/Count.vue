<template>
  <div>
    <input type="text" v-model.number="num" @input="transParaToFather" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  data() {
    return {
      number: 1,
    };
  },
  methods: {
    changeNum(num) {
      console.log("num: ", num);
      // this.number = num;
    },
  },
});
</script>
<style scoped></style>
