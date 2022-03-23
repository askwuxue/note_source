function render(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key]);
  // return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
  //   console.log("key: ", key);
  //   console.log("match: ", match);
  // });
}
const template = "{{name}}很厉name害，才{{age}}岁";
const context = { name: "jawil", age: "15" };
console.log(render(template, context));
