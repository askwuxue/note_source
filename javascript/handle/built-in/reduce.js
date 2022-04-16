Array.prototype.reduce2 = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0,
    result;

  if (arguments.length > 1) {
    result = initialValue;
  } else {
    // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
    while (k < len && !(k in O)) {
      k++;
    }
    if (k > len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    result = O[k++];
  }
  while (k < len) {
    if (k in O) {
      result = callback(result, O[k], k, O);
    }
    k++;
  }
  return result;
};

const arr = [, 2, 3, 4];
const res = arr.reduce2((prev, curr) => prev + curr, 1);
console.log("res: ", res);
