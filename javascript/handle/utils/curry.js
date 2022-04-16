const curry = fn => {
  return (judge = (...args) => {
    if (args.length === fn.length) {
      return fn(...args);
    }
    return (...args2) => judge(...args, ...args2);
  });
};

function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3);
let addCurry = curry(add);
// let res = addCurry(1)(2)(3);
let res = addCurry(1, 2, 3);
console.log("res: ", res);
