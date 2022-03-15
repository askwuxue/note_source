class Observer {
  constructor(data) {
    this.walk(data);
  }

  // 遍历data属性
  walk(data) {
    // data不存在或者data不是对象
    if (!data || typeof data !== "object") {
      return;
    }
    // 遍历data对象
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
  }

  // 为data对象上的所有属性注册get和set
  defineReactive(obj, key, val) {
    const that = this;
    // 负责收集依赖并发布通知
    let dep = new Dep();
    // TODO data中的属性可能是对象属性，需要递归遍历，对data的对象属性中的属性也要注册get和set
    this.walk(val);
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      // 监听对$data数据的访问, 因为$data对get方法有引用，所以不会释放val，形成了一个闭包
      get() {
        // TODO 此处只能使用val值而不能使用obj[key] 因为只要访问data的数据就会调用observer对象的get方法。会导致堆栈溢出
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      // 监听对$data对象的改变
      set(newValue) {
        if (newValue === val) {
          return;
        }
        val = newValue;
        // TODO 如果为data中的数据进行了重新赋值为对象，那么需要对该对象遍历，注册get和set
        // 此处的this指向了data对象，不是observer对象
        that.walk(newValue);
        // 发送通知
        dep.notify();
      },
    });
  }
}
