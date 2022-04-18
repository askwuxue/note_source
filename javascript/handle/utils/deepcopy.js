// 纯对象
const isObject = target => {
  return (typeof target === "object" && typeof target !== "null") || typeof target === "function";
};

// 获取类型
const getType = target => {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
};

// 克隆set
const deepCloneSet = target => {
  const cloneTarget = new Set();
  for (const element of target.values()) {
    cloneTarget.add(element);
  }
  return cloneTarget;
};

// 克隆map
const deepCloneMap = target => {
  const cloneTarget = new Map();
  for (const [key, value] of target.entries()) {
    cloneTarget.set(key, value);
  }
  return cloneTarget;
};

const deepCloneSymbol = target => {
  return Object(Symbol.prototype.valueOf.call(target));
};

// 克隆其他对象类型
const cloneOtherType = (target, type) => {
  const Constructor = target.constructor;
  switch (type) {
    case "date":
    case "regexp": {
      return new Constructor(target);
    }
    case "set": {
      return deepCloneSet(target);
    }
    case "map": {
      return deepCloneMap(target);
    }
    case "symbol": {
      return deepCloneSymbol(target);
    }
    default:
      break;
  }
};

function deepClone(target, map = new WeakMap()) {
  // 获取数据类型
  let type = getType(target);
  // 1. 克隆非对象类型
  if (!isObject(target)) {
    return target;
  }
  // 2. 防止循环引用
  if (map.get(target)) {
    return target;
  }
  // 3. 克隆对象
  if (type === "object") {
    // 为循环引用的对象做标记
    map.set(target, true);
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  }
  // 4. 克隆其他类型
  return cloneOtherType(target, type);
}

const obj = {
  a: 1,
  b: "string",
  c: true,
  d: new Date(),
  e: /^\d+$/g,
  f: new Set([1, 2, 3]),
  g: new Map([
    [1, "aaa"],
    ["b", "ccc"],
  ]),
  h: Symbol("123"),
};

const target = deepClone(obj);
console.log("obj: ", obj);
console.log("target: ", target);
console.log(target.d === obj.d);
console.log(target.e === obj.e);
console.log(target.f === obj.f);
console.log(target.g === obj.g);
console.log(target.h === obj.h);
