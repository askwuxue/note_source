// 事件中心
class EventEimt {
  constructor () {
    this.subs = Object.create(null)
  }

  // 注册事件 发布事件
  $on (eventType, handler) {
    this.subs[eventType] = this.subs[eventType] ? this.subs[eventType] : []
    this.subs[eventType].push(handler)
  }

  // 触发事件 订阅事件
  $emit (eventType) {
    this.subs[eventType]?.forEach(handler => handler())
  }
}

const ev = new EventEimt()

ev.$on('click', () => {
  console.log('click1')
})

ev.$on('click', () => {
  console.log('click2')
})

ev.$emit('c')
