function render(template, data) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => data[key.trim()]);
  // return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
  //   console.log("key: ", key);
  //   console.log("match: ", match);
  // });
}
const template = "{{ name }}很厉name害，才{{age }}岁";
const data = { name: "jawil", age: "15" };
console.log(render(template, data));
