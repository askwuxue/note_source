<template>
  <div>
    <var-button block @click="toggleTheme">切换主题</var-button>
  </div>
</template>

<script>
import dark from '@varlet-vue2/ui/es/themes/dark'
import { StyleProvider } from '@varlet-vue2/ui'

export default {
  data: () => ({
    currentTheme: null
  }),

  methods: {
    toggleTheme () {
      this.currentTheme = this.currentTheme ? null : dark
      StyleProvider(this.currentTheme)
    }
  },
}

</script>

<style scoped>
</style>