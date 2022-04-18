function parseParam(url) {
  // 将 ? 后面的字符串取出来
  //exec() 方法用于检索字符串中的正则表达式的匹配。
  const paramsStr = /.+\?(.+)$/.exec(url)[1];
  // 将字符串以 & 分割后存到数组中
  const paramsArr = paramsStr.split("&");
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    // 处理有 value 的参数
    if (/=/.test(param)) {
      // 分割 key 和 value
      let [key, val] = param.split("=");
      // 解码
      val = decodeURIComponent(val);
      // 判断是否转为数字
      //test() 方法用于检测一个字符串是否匹配某个模式.
      val = /^\d+(\.\d+)?$/.test(val) ? parseFloat(val) : val;
      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        //concat() 方法用于连接两个或多个数组。
        //该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
        paramsObj[key] = [].concat(paramsObj[key], val);
        // 不能使用rest展开，因为此时paramsObj[key]可能就是一个值
        // paramsObj[key] = [...paramsObj[key], val];
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });

  return paramsObj;
}

let url =
  "https://www.google.com.hk/search?q=JSON+stringify+%E5%AE%9E%E7%8E%B0&newwindow=1&sxsrf=APq-WBvZoXACDKMrMqm_V2Iguvd6fh6x-g%3A1649233340159&ei=vE1NYqm3CbyckPIP6d-jkA0&oq=json.stringify+%E6%89%8B%E5%86%99&gs_lcp=Cgdnd3Mtd2l6EAMYATIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwA0oECEEYAEoECEYYAFAAWABgmB1oAXABeACAAQCIAQCSAQCYAQDIAQTAAQE&sclient=gws-wiz&num=6.32&flag";
let res = parseParam(url);
console.log("res: ", res);
