Object.assign2 = function (target, ...source) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  // 如果给定的值是 null 或 undefined, 它会创建并返回一个空对象。
  // 否则，它将返回一个和给定的值相对应的类型的对象。
  // 如果给定值是一个已经存在的对象，则会返回这个已经存在的值（相同地址）。
  let result = Object(target);
  source.forEach(function (obj) {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = obj[key];
        }
      }
    }
  });
  return result;
};

const target = {};
const source = {
  a: "1",
};
const source1 = {
  a: "2",
};

const res = Object.assign2(target, source, source1);
console.log("res: ", res);
