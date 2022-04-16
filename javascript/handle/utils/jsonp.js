const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = "";
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script");
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    try {
      window[callbackName] = data => {
        resolve(data);
        document.removeChild(scriptEle);
      };
    } catch (error) {
      document.removeChild(scriptEle);
      reject(error);
    }
  });
};

// TEST
const res = jsonp({ url: "http://www.baidu.com", params: { name: "wuxue" }, callbackName: "fun" });
