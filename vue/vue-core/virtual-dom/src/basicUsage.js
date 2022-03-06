import {
  init,
  classModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  classModule,
  styleModule,
  eventListenersModule
]);

// let vNode = h('div#container.cls', { hook: {
//   init (vnode) {
//     console.log('vnode: ', vnode)
//   },
//   create (emptyNode, vnode) {
//     console.log('emptyNode: ', emptyNode)
//     console.log('vnode: ', vnode)
//   }
// }}, 'Hello World')

let vNode = h('div#container.cls', {}, [
  h('ul', {}, [
    h('li', '首页'),
    h('li', '微博'),
    h('li', '视频'),
  ])
])

let dom = document.querySelector('#app')

let oldDom = patch(dom, vNode)

vNode = h('div#container.cls', {}, [
  h('ul', {}, [
    h('li', '首页'),
    h('li', '视频'),
    h('li', '微博'),
  ])
])

patch(oldDom, vNode)


// setTimeout(() => {
//   vNode = h('div#container.father', { style: { color: '#ccc' }, on: { click: handleClickDiv } }, [
//     h('h1', 'this is h1'),
//     h('p', { on: { click: handleClick } }, 'this is snabbdom contents')
//   ])
//   patch(oldDom, vNode)
// }, 2000)

// function handleClick () {
//   console.log('click')
// }

// // 依旧会有事件冒泡
// function handleClickDiv () {
//   console.log('click div')
// }