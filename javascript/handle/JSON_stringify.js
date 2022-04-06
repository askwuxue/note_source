// 循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
// 布尔值、数字、字符串等包装对象在序列化过程中会自动转换成对应的原始值。
// function、undefined、symbol 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined)。这就是为什么对象中有这些类型的属性，不能使用JSON.parse(JSON.stringify())来进行深拷贝。
// Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
// NaN 和 Infinity 格式的数值及 null 都会被当做 null。
// undefined、function、symbol，出现在非数组对象的属性值中时， 在序列化过程中会被忽略。
// undefined、function、symbol，出现在数组中时，被转换成 null
// 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

const getType = data => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

function jsonStringify(data) {
  let dataType = getType(data);

  // string 类型
  if (dataType === "string") {
    return `"${data}"`;
  }
  // number 类型, Boolean 类型
  if (dataType === "number" || dataType === "boolean") {
    return data;
  }

  // function、undefined、symbol被单独转换时，返回undefined
  if (dataType === "function" || dataType === "undefined" || dataType === "symbol") {
    return undefined;
  }

  // Date日期调用了toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
  if (dataType === "date") {
    if (data.toJSON && typeof data.toJSON === "function") {
      return jsonStringify(data.toJSON());
    }
  }

  // NaN 和 Infinity 格式的数值及 null 都会被当做 null。
  if (Number.isNaN(data) || data === Infinity || data === null) {
    return "null";
  }

  // array 类型
  if (dataType === "array") {
    let result = [];
    data.forEach((item, index) => {
      let itemType = getType(item);
      // undefined、function、symbol，在序列化过程中会被转换成 null（出现在数组中时）。
      if (
        itemType === "undefined" ||
        itemType === "function" ||
        itemType === "symbol" ||
        itemType === "null"
      ) {
        result[index] = "null";
      } else {
        result[index] = jsonStringify(item);
      }
    });
    return `[${result}]`;
  }

  /**
   * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
   * symbol key 忽略
   * undefined、函数、symbol 为属性值，被忽略
   */
  if (dataType === "object") {
    let result = "";
    Object.keys(data).forEach(item => {
      let keyType = getType(item);
      // 对象key如果是symbol对象，忽略
      if (keyType !== "symbol") {
        let valueType = getType(data[item]);
        // undefined、function、symbol，出现在非数组对象的属性值中时, 在序列化过程中会被忽略
        if (valueType !== undefined && valueType !== "function" && valueType !== "symbol") {
          if (result === "") {
            result = `"${item}":${jsonStringify(data[item])}`;
          } else {
            result += `,"${item}":${jsonStringify(data[item])}`;
          }
        }
      }
    });
    return `{${result}}`;
  }
}

// TETS
const sym = Symbol("window");
const obj = {
  str: "string",
  num: 5,
  bol: true,
  arr: [
    "string1",
    6,
    true,
    null,
    undefined,
    function fun(params) {
      console.log(params);
    },
    Symbol("sym"),
  ],
  func() {
    console.log("fun");
  },
  [Symbol()]: "sdf",
  obj: {
    func1() {
      console.log("fun1");
    },
  },
};

const str = jsonStringify(obj);
console.log("str: ", str);
