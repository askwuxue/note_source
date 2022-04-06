// fn（1，2，3） //3，4，5
let cache = [];
let result;

// const fn = (...args) => {
//   let len = args.length;
//   if (cache.length !== 0 && result) {
//     for (let i = 0; i < len; ++i) {
//       if (cache.indexOf(args[i]) === -1) {
//         break;
//       }
//     }
//     return result;
//   }
//   result = args.reduce((prev, curr) => prev * curr);
//   cache = args;
//   return result;
// };

const fn = (function name() {
  let cache = [];
  let result;
  return function (...args) {
    if (cache.length !== 0) {
      let cacheFlag = cache.every(item => args.includes(item));
      if (cacheFlag) {
        return result;
      }
    }
    result = args.reduce((prev, curr) => prev * curr);
    while (args.length !== 0) {
      cache.push(args.pop());
    }
    return result;
  };
})();

const res = fn(3, 1, 2);
const res1 = fn(3, 2, 1);
const res2 = fn(3, 2, 4);

console.log("res: ", res);
console.log("res1: ", res1);
console.log("res2: ", res2);
