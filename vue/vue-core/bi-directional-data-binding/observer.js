// 发布者
class Dep {
  constructor () {
    // 记录所有订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 通知订阅者
  notify () {
    this.subs.forEach(sub => sub.update())
  }
}

// 订阅者
class Watch {
  update () {
    console.log('update')
  }
}

const pub = new Dep()
const w1 = new Watch()
pub.addSub(w1)
pub.addSub(w1)
pub.notify()
