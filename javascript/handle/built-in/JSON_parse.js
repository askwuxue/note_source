// const parse = json => {
//   return eval(`(${json})`);
// };

const parse = json => {
  return new Function(`return ${json}`)();
};

const jsonStr = '{"a":"1", "b":2}';
const json = parse(jsonStr);
console.log("json: ", json);
