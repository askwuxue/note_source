function Animal(name) {
  this.name = name;
  this.colors = ["black", "white"];
  this.getName = function () {
    return this.name;
  };
}
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = new Animal();

const dog = new Dog("abc");
const ani = new Animal("cde");
dog.colors.push("blue");
console.log("dog: ", dog);
console.log("ani: ", ani);
