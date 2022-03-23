function curry(fn) {
  const judge = (...args) => {
    if (fn.length === args.length) {
      return fn(...args);
    } else {
      return (...arg) => judge(...args, ...arg);
    }
  };
  return judge;
}

function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3);
let addCurry = curry(add);
let res = addCurry(1)(2)(3);
console.log("res: ", res);
