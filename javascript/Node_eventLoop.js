// 1.
// setTimeout(() => {
//   console.log("timer1");
//   Promise.resolve().then(function () {
//     console.log("promise1");
//   });
// }, 0);
// setTimeout(() => {
//   console.log("timer2");
//   Promise.resolve().then(function () {
//     console.log("promise2");
//   });
// }, 0);

// 2. 浏览器端和Node端的事件循环不同
console.log("Script开始");
setTimeout(() => {
  console.log("第一个回调函数，宏任务1");
  Promise.resolve().then(function () {
    console.log("第四个回调函数，微任务2");
  });
}, 0);
setTimeout(() => {
  console.log("第二个回调函数，宏任务2");
  Promise.resolve().then(function () {
    console.log("第五个回调函数，微任务3");
  });
}, 0);
Promise.resolve().then(function () {
  console.log("第三个回调函数，微任务1");
});
console.log("Script结束");
