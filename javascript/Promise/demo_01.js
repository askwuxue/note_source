const MyPromise = require('./myPromise-1')

const p1 = new MyPromise((resolve, reject) => {
  // resolve('成功');
  // reject('失败');
  setTimeout(() => {
    resolve('成功');
  }, 1000)
})
p1.then(data => {
  console.log('data: ', data);
}, err => {
  console.log('err: ', err);
})

p1.then(data => {
  console.log('data: ', data);
}, err => {
  console.log('err: ', err);
})

p1.then(data => {
  console.log('data: ', data);
  return new MyPromise((resolve) => {
    resolve(200)
  });
}, err => {
  console.log('err: ', err);
}).then(data => {
  console.log('data: ', data);
})