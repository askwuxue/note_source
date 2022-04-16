class EventEmitter {
  constructor() {
    this.cache = {};
  }
  on(name, fn) {
    if (!this.cache[name]) {
      this.cache[name] = [fn];
    } else {
      this.cache[name].push(fn);
    }
  }
  off(name, fn) {
    if (this.cache[name]) {
      let tasks = this.cache[name];
      let index = tasks.findIndex(fun => fun === fn);
      tasks.splice(index, 1);
    }
  }
  emit(name, ...args) {
    if (this.cache[name]) {
      // 创建副本，防止在回调函数中进行注册，造成堆栈溢出
      let tasks = this.cache[name].slice();
      for (const fn of tasks) {
        fn(...args);
      }
    }
  }
  once(name, ...args) {
    if (this.cache[name]) {
      // 创建副本，防止在回调函数中进行注册，造成堆栈溢出
      let tasks = this.cache[name].slice();
      for (const fn of tasks) {
        fn(...args);
      }
      delete this.cache[name];
    }
  }
}

let eventBus = new EventEmitter();
let fn1 = function (name, age) {
  console.log(`${name} ${age}`);
};
let fn2 = function (name, age) {
  console.log(`hello, ${name} ${age}`);
};
eventBus.on("aaa", fn1);
eventBus.on("aaa", fn2);
eventBus.emit("aaa", "布兰", 12);
