Array.prototype.forEach2 = function (callback, context) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this); // this 就是当前的数组
  // 无符号右移 0 位，为了保证转换后的值为正整数,第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型
  const len = O.length >>> 0; // 后面有解释
  // let k = 0;
  // while (k < len) {
  //   if (k in O) {
  //     callback.call(context, O[k], k, O);
  //   }
  //   k++;
  // }
  for (let i = 0; i < len; ++i) {
    callback.call(context, O[i], i, O);
  }
};

let arr = [1, 2, 3];
// let arr1 = [4, 5, 6];
arr.forEach2((value, index, arr) => {
  console.log("arr: ", arr);
  console.log("index: ", index);
  console.log("value: ", value);
});
// arr.forEach2((value, index, arr) => {
//   console.log("arr: ", arr);
//   console.log("index: ", index);
//   console.log("value: ", value);
// }, arr1);
