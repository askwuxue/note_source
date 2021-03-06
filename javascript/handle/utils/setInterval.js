// 每个 setTimeout 产生的任务会直接 push 到任务队列中；
// setInterval 在每次把任务 push 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)
// 在前一个定时器执行完前，不会向队列插入新的定时器（缺点一）
// 保证定时器间隔（缺点二）
function mySetInterval(fn, delay) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(interval, delay);
  }
  interval();
  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}
