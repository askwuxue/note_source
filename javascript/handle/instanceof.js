function instanceOf(instance, constructor) {
  let proto = Object.getPrototypeOf(instance);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

const A = function (name) {
  this.name = name;
};
const B = function (age) {
  this.age = age;
};

const a = new A("wuyxue");
const b = new B(23);

console.log(instanceOf(a, A));
console.log(instanceOf(a, B));
console.log(instanceOf(a, Object));
