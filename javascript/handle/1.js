// fn（1，2，3） //3，4，5
let cache = [];
let result;

const fn = (...args) => {
  let len = args.length;
  if (cache.length !== 0 && result) {
    for (let i = 0; i < len; ++i) {
      if (cache.indexOf(args[i]) === -1) {
        break;
      }
    }
    return result;
  }
  result = args.reduce((prev, curr) => prev * curr);
  cache = args;
  return result;
};

const res = fn(3, 1, 2);
console.log("res: ", res);
