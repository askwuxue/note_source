const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 判断Promise对象then方法返回值并进行处理
const resolvePromise = (promise, nextValue, resolve, reject) => {
  // 如果在then方法中返回了当前Promise对象，则进行了循环引用，需要错误处理
  if (promise === nextValue) return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`))
  // 如果在then方法中返回了当前Promise对象，则进行了循环引用，需要错误处理
  if (nextValue instanceof MyPromise) {
    // 返回值是Promise对象，调用该Promise对象的then方法
    nextValue.then(resolve, reject)
  } else {
    resolve(nextValue)
  }
}

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  // Promise状态
  status = PENDING
  // 成功的的值
  value = undefined
  // 失败的原因
  reason = undefined
  // 成功的回调函数
  successCallBack = []
  // 失败的回调函数
  failCallBack = []
  // pending -> fulfilled
  resolve = value => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    // 调用then方法中的回调函数
    while (this.successCallBack.length) {
      this.successCallBack.shift()(this.value)
    }
  }
  // pending -> rejected
  reject = reason => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    // 调用then方法中的回调函数
    while (this.failCallBack.length) {
      this.failCallBack.shift()(this.reason)
    }
  }
  // then
  then(successCallBack, failCallBack) {
    // 如果then方法没有传递参数，则使用一个函数作为默认参数
    successCallBack = successCallBack ? successCallBack : value => value
    failCallBack = failCallBack ? failCallBack : reason => { throw reason }
    // then方法返回一个Promise对象
    let promise = new MyPromise((resolve, reject) => {
      // 当前状态是fulfilled，执行成功回调
      if (this.status === FULFILLED) {
        // 为了能拿到Mypromise实例对象，需要异步执行函数
        setTimeout(() => {
          try {
            // 传递给下一个Promise对象的值是then方法的返回值
            let nextValue = successCallBack(this.value)
            resolvePromise(promise, nextValue, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
        // 当前状态是rejected，执行失败回调
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let nextValue = failCallBack(this.reason)
            resolvePromise(promise, nextValue, resolve, reject)
            // 当前状态是padding, 如异步函数调用。暂时将成功和失败的回调存储。
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else {
        this.successCallBack.push(() => {
          setTimeout(() => {
            try {
              let nextValue = successCallBack(this.value)
              resolvePromise(promise, nextValue, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.failCallBack.push(() => {
          setTimeout(() => {
            try {
              let nextValue = failCallBack(this.reason)
              resolvePromise(promise, nextValue, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    return promise
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  // Promise.resolve 静态方法
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  // Promise.all 静态方法
  static all(array) {
    let result = [];
    let index = 0;
    // Promise.all 返回一个Promise对象
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < array.length; ++i) {
        MyPromise.resolve(array[i]).then(value => {
          result[i] = value
          ++index
          // 当all参数数组中所有项执行结束后执行resolve方法
          if (index === array.length) {
            resolve(result);
          }
        }, err => reject(err))
      }
    })
  }
}

module.exports = MyPromise