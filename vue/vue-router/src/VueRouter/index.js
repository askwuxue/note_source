let _Vue = null
export default class VueRouter {
  // 接受两个参数，一个是Vue的构造函数
  static install (Vue) {
    if (VueRouter.install.installed) {
      return
    }
    // 1. 判断当前插件是否安装
    VueRouter.install.installed = true
    // 2. Vue构造函数记录到全局，后续使用
    _Vue = Vue
    // 3. 把创建Vue实例时传入的router对象注入到Vue实例
    // TODO 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }
}
