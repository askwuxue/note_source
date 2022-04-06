const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const resolvePromise = (promise2, result, resolve, reject) => {
  // 如果promise.then返回了当前的Promise，发生了循环引用，错误行为  Promise/A+ 2.3.1
  if (promise2 === result) {
    let reason = new TypeError("Chaining cycle detected for promise #<Promise>");
    return reject(reason);
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 如果Promise.then() 中返回的是promise对象
  if ((typeof result === "object" && result != null) || typeof result === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = result.then;
      if (typeof then === "function") {
        // 不要写成 result.then，直接 then.call 就可以了 因为 result.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          result,
          y => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 result.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(result);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 result 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(result);
  }
};
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 解决 onFulfilled，onRejected 没有传值的问题
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    // 因为错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : err => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value);
            // result可能是一个promise
            resolvePromise(promise2, result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let result = onRejected(this.reason);
            resolvePromise(promise2, result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let result = onFulfilled(this.value);
              resolvePromise(promise2, result, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let result = onRejected(this.reason);
              resolvePromise(promise2, result, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  // Promise.all 静态方法, 当所有promise状态都是fulfilled才成功
  static all(array) {
    let result = [];
    let index = 0;
    // Promise.all 返回一个Promise对象
    return new Promise((resolve, reject) => {
      let add = (key, value) => {
        result[key] = value;
        ++index;
        // 当all参数数组中所有项执行结束后执行resolve方法
        if (index === array.length) {
          resolve(result);
        }
      };
      for (let i = 0; i < array.length; ++i) {
        // 如果是Promise对象
        if (array[i] instanceof Promise) {
          array[i].then(
            value => {
              add(i, value);
            },
            reason => reject(reason)
          );
          // 普通值
        } else {
          add(i, array[i]);
        }
      }
    });
  }
}

// 包装成一个promise对象后返回，状态一直都是fulfilled
Promise.resolve = function (value) {
  // 如果是 Promise，则直接输出它
  if (value instanceof Promise) {
    return value;
  }
  return new Promise(resolve => resolve(value));
};

// 只要有一个状态繁盛变化，就返回结果
Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(p => {
      Promise.resolve(p).then(
        val => {
          resolve(val);
        },
        err => {
          reject(err);
        }
      );
    });
  });
};

// 所有promise的状态都发生变化后才返回，并且返回的promise状态总是fulfilled
Promise.allSettled = function (promiseArr) {
  let result = [];
  return new Promise((resolve, reject) => {
    promiseArr.forEach(p => {
      Promise.resolve(p).then(
        val => {
          result.push({
            status: "fulfilled",
            value: val,
          });
          if (result.length === promiseArr.length) {
            resolve(result);
          }
        },
        err => {
          result.push({
            status: "rejected",
            reason: err,
          });
          if (result.length === promiseArr.length) {
            resolve(result);
          }
        }
      );
    });
  });
};

// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
Promise.any = function (promiseArr) {
  let index = 0;
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) return;
    promiseArr.forEach(p => {
      Promise.resolve(p).then(
        val => {
          resolve(val);
        },
        err => {
          index++;
          if (index === promiseArr.length) {
            let reason = new AggregateError("All promises were rejected");
            reject(reason);
          }
        }
      );
    });
  });
};

// // TEST
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("hello");
//   }, 1000);
// }).then(result => result);

// const p2 = new Promise((resolve, reject) => {
//   // throw new Error("报错了");
//   reject("报错了");
// }).then(result => result);

// Promise.all([p1, p2]).then(
//   result => console.log(result),
//   e => console.log(e)
// );
// .catch(e => console.log(e));

// const p = Promise.race([p1, p2]);
// console.log(
//   "p: ",
//   p.then(
//     val => {
//       console.log("val: ", val);
//     },
//     e => {
//       console.log("e: ", e);
//     }
//   )
// );

// promise.js
// 终端测试命令 promises-aplus-tests promise.js

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
