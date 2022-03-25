const MyPromise = require('./myPromise');

let promise = new MyPromise((resolve, reject) => {
    resolve('成功');
    // throw new Error('executor error');
    // setTimeout(() => {
    //     resolve('成功');
    // }, 2000);
    // reject('失败的原因');
})

let p1 = new MyPromise((resolve, reject) => {
    resolve('p1.....');
})

let p2 = new MyPromise((resolve, reject) => {
    resolve('p2.....');
})

let p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3.....');
    }, 1000)
})

MyPromise.all(['a', 1, p1, p2, p3]).then(value => {
    console.log(value);
}, err => {
    console.log(err);
})

// promise.then().then().then(value => {
//     console.log(value)
// }, err => {
//     console.log(err);
// })

// const others = new MyPromise((resolve, reject) => {
//     resolve('others Promise')
// })

// let p1 = promise.then(value => {
//     console.log(value)
//     // throw new Error('then error')
//     // return 100;
//     // return p1
//     return 'aaa';
// }, (error) => {
//     console.log(error);
//     return 10000;
// })
// p1.then((value) => {
//     console.log(value)
// }, reason => {
//     console.log(reason.message)
// })
// p1.then(value => {
//      console.log(value)
//      return others;
//      // console.log(value)
//  }).then(value => {
//      console.log(value);
//  })
// promise.then(value => {
//     console.log(value)
//     // console.log(value);
//     return value;
// }, reason => {
//     console.log(value)
//     console.log(reason);
// }).then(value => {
//     console.log(value)
//     // console.log(value)
// }, reason => {
//     console.log(value)
//     console.log(reason);
// })