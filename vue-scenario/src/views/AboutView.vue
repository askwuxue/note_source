<template>
  <div class="about">
    <h1>this is B page</h1>
    <div class="target">
      <router-link to="/">to A page</router-link>
    </div>
  </div>
</template>

<script>
const _ = require('lodash')
export default {
  name: 'AboutView',
  components: {},
  data() {
    return {
      scrollTop: '',
      removeFlag: null,
    }
  },
  // created() {
  //   console.log('About created ...')
  // },
  // mounted() {
  //   console.log('About mounted ...')
  // },
  // 进入当前组件时监听scroll事件，并且将页面位置记录到data对象scrollTop中。
  // 根据保存的scrollTop值回到上一次离开页面的位置
  activated() {
    console.log('About activated ...')
    document.documentElement.scrollTop = this.scrollTop
    window.addEventListener('scroll', this.handlerDebounceScroll())
  },
  // 离开页面，移除scroll事件监听
  deactivated() {
    console.log('About deactivated ...')
    window.removeEventListener('scroll', this.handlerDebounceScroll())
  },
  methods: {
    handlerScroll() {
      console.log('this.scrollTop: ', this.scrollTop)
      this.scrollTop = document.documentElement.scrollTop
    },
    handlerDebounceScroll(delay = 500) {
      // 移除的标识
      if (!this.removeFlag) {
        this.removeFlag = _.debounce(this.handlerScroll, delay)
      }
      // 控制台查看当前绑定的事件
      // window.getEventListeners(window)
      return this.removeFlag
    },
  },
}
</script>

<style scoped>
.about {
  height: 2000px;
}
.target {
  width: 100px;
  height: 100px;
  margin-top: 1000px;
}
</style>
