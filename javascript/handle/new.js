const _new = (constructor, ...args) => {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === "object" && result !== null ? result : obj;
};

// TODO 不要使用箭头函数，thi会丢失
function constructor(name, age) {
  this.name = name;
  this.age = age;
  // return {};
}

const res = _new(constructor, "wuxue", 123);
console.log("res: ", res);
console.log(Object.getPrototypeOf(res) === constructor.prototype);
