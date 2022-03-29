function mySettimeout(fn, t) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(interval, t);
  }
  interval();
  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}
// let a=mySettimeout(()=>{
//   console.log(111);
// },1000)
// let b=mySettimeout(() => {
//   console.log(222)
// }, 1000)
