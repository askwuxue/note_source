<template>
 <div>
   1111
 </div>
</template>

<script lang='ts'>
import {defineComponent, SetupContext, ref, Ref} from 'vue'
// interface Data {

// }
const RefDemo = defineComponent({
  name: '',
  props: {

  },
  components: {

  },
  setup(props, ctx: SetupContext){
    const rep: Ref = ref([1, 2])
    console.log(rep.value)
    return {
      rep
    }
  },
  created() {
    console.log('created', Object.prototype.toString.call(this.rep))
  },
})

export default RefDemo
</script>

<style scoped lang='scss'>

</style>