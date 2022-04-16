// function flatten(arr) {
//   var result = [];
//   for (var i = 0, len = arr.length; i < len; i++) {
//     if (Array.isArray(arr[i])) {
//       result = result.concat(flatten(arr[i]));
//     } else {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

function flatten(arr) {
  let result = arr;
  while (result.some(item => Array.isArray(item))) {
    result = [].concat(...result);
  }
  return result;
}

const arr = [1, 2, [3, [4, 5], 6], 7];
const res = flatten(arr);
console.log("res: ", res);
