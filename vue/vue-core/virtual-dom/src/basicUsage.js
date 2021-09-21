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

// let vNode = h('div#container.cls', 'Hello World')
// let vNode = h('div#container.cls', 'Hello World')
let vNode = h('div#container.cls', {}, [
  h('p', 'this is old contents')
])

let dom = document.querySelector('#app')

let oldDom = patch(dom, vNode)

vNode = h('div#container.xxx', 'Hello snabbdom')

// patch(oldDom, vNode)


setTimeout(() => {
  vNode = h('div#container.father', { style: { color: '#ccc' }, on: { click: handleClickDiv } }, [
    h('h1', 'this is h1'),
    h('p', { on: { click: handleClick } }, 'this is snabbdom contents')
  ])
  patch(oldDom, vNode)
}, 2000)

function handleClick () {
  console.log('click')
}

// 依旧会有事件冒泡
function handleClickDiv () {
  console.log('click div')
}