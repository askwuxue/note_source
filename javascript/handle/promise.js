const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

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
    // 解决 onFufilled，onRejected 没有传值的问题
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
            let nextValue = onFulfilled(this.value);
            // nextValue可能是一个proimise
            resolvePromise(promise2, nextValue, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let nextValue = onFulfilled(this.value);
              resolvePromise(promise2, nextValue, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let nextValue = onRejected(this.reason);
              resolvePromise(promise2, nextValue, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  // Promise.all 静态方法
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

const resolvePromise = (promise2, nextValue, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === nextValue) {
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof nextValue === "object" && nextValue != null) || typeof nextValue === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = nextValue.then;
      if (typeof then === "function") {
        // 不要写成 nextValue.then，直接 then.call 就可以了 因为 nextValue.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          nextValue,
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
        // 如果 nextValue.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(nextValue);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 nextValue 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(nextValue);
  }
};

Promise.resolve = function (value) {
  // 如果是 Promsie，则直接输出它
  if (value instanceof Promise) {
    return value;
  }
  return new Promise(resolve => resolve(value));
};

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

Promise.allSettled = function (promiseArr) {
  let result = [];
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
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

Promise.any = function (promiseArr) {
  let index = 0;
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) return;
    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(
        val => {
          resolve(val);
        },
        err => {
          index++;
          if (index === promiseArr.length) {
            reject(new AggregateError("All promises were rejected"));
          }
        }
      );
    });
  });
};

// TEST
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 1000);
}).then(result => result);

const p2 = new Promise((resolve, reject) => {
  // throw new Error("报错了");
  reject("报错了");
}).then(result => result);

// Promise.all([p1, p2]).then(
//   result => console.log(result),
//   e => console.log(e)
// );
// .catch(e => console.log(e));

const p = Promise.race([p1, p2]);
console.log(
  "p: ",
  p.then(
    val => {
      console.log("val: ", val);
    },
    e => {
      console.log("e: ", e);
    }
  )
);

// promise.js
// 这里是上面写的 Promise 全部代码
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;