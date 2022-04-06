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
    let cacheLen = cache.length;
    let cacheFlag = true;
    // 参数的数量和缓存数组的数量一致
    if (cacheLen !== 0 && cacheLen === args.length) {
      cache.sort((v1, v2) => v1 - v2);
      args.sort((v1, v2) => v1 - v2);
      // 参数数组和缓存数组的元素全部一致
      for (let i = 0; i < cacheLen; ++i) {
        if (cache[i] !== args[i]) {
          cacheFlag = false;
          break;
        }
      }
      // 缓存命中
      if (cacheFlag) {
        return result;
      }
    }
    // 缓存没有命中
    result = args.reduce((prev, curr) => prev * curr);
    // 更新缓存数组
    if (args.length !== 0) {
      cache.length = 0;
      while (args.length !== 0) {
        cache.push(args.shift());
      }
    }
    return result;
  };
})();

const res = fn(3, 1, 2);
const res1 = fn(3, 2, 1);
const res2 = fn(3, 2, 1, 5, 5);
const res3 = fn(3, 2, 1, 5);

console.log("res: ", res);
console.log("res1: ", res1);
console.log("res2: ", res2);
console.log("res3: ", res3);
