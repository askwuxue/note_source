class Watch {
  constructor (vm, key, cb) {
    this.vm = vm
    // data属性
    this.key = key
    // 更新视图
    this.cb = cb
    // watch对象记录到Dep的静态方法target上
    Dep.target = this
    // 触发get方法，触发Dep的addSub方法
    this.oldValue = vm[key]
    Dep.target = null
  }
  update () {
    let newValue = this.vm[this.key]
    if (newValue === this.oldValue) {
      return
    }
    // 更新视图
    this.cb(newValue)
  }
}