Function.prototype.call2 = function (that, ...args) {
  const context = that ?? window;
  context.fn = this;

  let result;
  if (args.length === 0) {
    result = context.fn();
  } else {
    result = context.fn(...args);
  }
  delete context.fn;
  return result;
};

var a = "window a";

const obj = {
  a: 1,
};
function fn(...args) {
  console.log("args: ", args);
  console.log(this.a);
  return 1;
}
// const res = fn.call2(obj, [1, 2, 3]);
const res = fn.call2(null, 1, 2, 3);
console.log("res: ", res);
