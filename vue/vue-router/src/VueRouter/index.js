let _Vue = null;
export default class VueRouter {
  // 接受两个参数，一个是Vue的构造函数
  static install(Vue) {
    if (VueRouter.install.installed) {
      return;
    }
    // 1. 判断当前插件是否安装
    VueRouter.install.installed = true;
    // 2. Vue构造函数记录到全局，后续使用
    _Vue = Vue;
    // 3. 把创建Vue实例时传入的router对象注入到Vue实例
    // TODO 混入 所有Vue实例以及组件上都会被混入
    _Vue.mixin({
      beforeCreate() {
        // 只有当前Vue实例上具有$options,才在Vue原型上挂载$router对象
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          // 进行初始化
          this.$options.router.init();
        }
      },
    });
  }

  // 构造函数
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    // 让一个对象可响应 Vue 内部会用它来处理 data 函数返回的对象
    // 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新
    this.data = _Vue.observable({
      current: "/",
    });
    // _Vue.utils.defineReactive(this, 'matched', [])
  }

  // 初始化操作
  init() {
    this.createRouteMap(this.options.routes);
    this.initComponent(_Vue);
    this.intiEvent();
  }

  // 将传递给Vue-Router对象的options对象转换成routeMap
  createRouteMap(routes) {
    routes.forEach(route => {
      if (route.children && Array.isArray(route.children)) {
        this.createRouteMap(route.children);
      }
      this.routeMap[route.path] = route.component;
    });
  }

  // 创建router-link
  initComponent(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      methods: {
        clickHandler(e) {
          // 改变浏览器的地址栏，会被浏览器的历史记住 不刷新页面，不向服务器发送请求
          window.history.pushState({}, "", this.to);
          // router-link是Vue实例 都可以访问Vue.prototype 注册了$router对象
          this.$router.data.current = this.to;
          // 阻止默认事件行为
          e.preventDefault();
        },
      },
      // template: `<a :href="to"><slot></slot></a>`,
      render(h) {
        // h 函数创建虚拟DOM 第一个参数标签名 第二个参数是是参数对象， 第三个参数是文本内容
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },
    });

    const self = this;
    // 创建router-view
    Vue.component("router-view", {
      render(h) {
        // this.$vnode.data.routerView = true
        // let depth = 0
        // let parent = this.$parent
        // while (parent) {
        //   // const routerView = parent?.$vnode?.data?.routerView
        //   const vnodeData = parent.$vnode ? parent.$vnode.data : {}
        //   if (vnodeData.routerView) {
        //     depth++
        //   }
        //   parent = parent.$parent
        // }
        // 获取路由组件
        const component = self.routeMap[self.data.current];
        return h(component);
      },
    });
  }

  // 初始化事件处理
  intiEvent() {
    // popstate 事件函数 当浏览器地址栏发生变化时触发
    window.addEventListener("popstate", () => {
      // 改变当前的路径
      this.data.current = window.location.pathname;
    });
  }
}
