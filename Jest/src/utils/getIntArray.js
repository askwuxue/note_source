export const getIntArray = (num) => {
  if (!Number.isInteger(num)) {
    throw Error('"getIntArray"只接受整数类型的参数');
  }
  
  return [...new Array(num).keys()];
};

