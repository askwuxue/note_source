const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 判断Promise对象then方法返回值并进行处理
const resolvePromise = (promise, nextValue, resolve, reject) => {
    // 如果在then方法中返回了当前Promise对象，则进行了循环引用，需要错误处理
    if (promise === nextValue) return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`))
    if (nextValue instanceof MyPromise) {
        // 返回值是Promise对象，调用该Promise对象的then方法
        nextValue.then(resolve, reject)
    } else {
        resolve(nextValue);
    }
}
class MyPromise {
    // Promise 对象接受一个执行器，会立即执行
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    // Promise的状态
    status = PENDING

    // resolve成功的值
    value = undefined;

    // reject失败的原因
    reason = undefined;

    // 存储成功的回调函数,因为可能会连续调用then方法，所以使用数组存储
    successCallBack = [];

    // 存储失败的回调函数，因为可能会连续调用then方法，所以使用数组存储
    failCallBack = [];

    // resolve接受成功的值
    resolve = value => {
        // 如果当前状态不是pending 则状态已经确定
        if (this.status !== PENDING) return
        this.status = FULFILLED;
        this.value = value;
        // 成功回调函数的执行。此时resolve函数已经执行
        // this.successCallBack && this.successCallBack(value);
        while (this.successCallBack.length) this.successCallBack.shift()();
    }

    // reject接受失败的原因
    reject = reason => {
        // 如果当前状态不是pending 则状态已经确定
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason;
        // 失败回调函数的执行。此时reject函数已经执行
        // this.failCallBack && this.failCallBack(reason);
        while (this.failCallBack.length) this.failCallBack.shift()();
    }

    // 执行Promise对象的then方法
    then = (successCallBack, failCallBack) => {
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
                        // 传递给下一个Promise对象的值是then方法的返回值，成功时即successCallBack的值
                        let nextValue = successCallBack(this.value);
                        // 判断上一个Promise对象的then方法返回的值的类型，如果是普通值，直接调用resolve方法
                        // 如果是Promise对象，先判断Promise对象的状态，成功调用resolve方法，失败调用reject
                        resolvePromise(promise, nextValue, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
                // 当前状态是rejected，执行失败回调
            } else if (this.status === REJECTED) {
                // 为了能拿到Mypromise实例对象，需要异步执行函数
                setTimeout(() => {
                    try {
                        // 传递给下一个Promise对象的值是then方法的返回值，成功时即successCallBack的值
                        let nextValue = failCallBack(this.reason);
                        // 判断上一个Promise对象的then方法返回的值的类型，如果是普通值，直接调用resolve方法
                        // 如果是Promise对象，先判断Promise对象的状态，成功调用resolve方法，失败调用reject
                        resolvePromise(promise, nextValue, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
                // 当前状态是padding, 如异步函数调用。此时resolve和reject都没有调用。暂时将成功和失败的回调存储。
            } else {
                this.successCallBack.push(() => {
                    // 为了能拿到Mypromise实例对象，需要异步执行函数
                    setTimeout(() => {
                        try {
                            // 传递给下一个Promise对象的值是then方法的返回值，成功时即successCallBack的值
                            let nextValue = successCallBack(this.value);
                            // 判断上一个Promise对象的then方法返回的值的类型，如果是普通值，直接调用resolve方法
                            // 如果是Promise对象，先判断Promise对象的状态，成功调用resolve方法，失败调用reject
                            resolvePromise(promise, nextValue, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.failCallBack.push(() => {
                    // 为了能拿到Mypromise实例对象，需要异步执行函数
                    setTimeout(() => {
                        try {
                            // 传递给下一个Promise对象的值是then方法的返回值，成功时即successCallBack的值
                            let nextValue = failCallBack(this.reason);
                            // 判断上一个Promise对象的then方法返回的值的类型，如果是普通值，直接调用resolve方法
                            // 如果是Promise对象，先判断Promise对象的状态，成功调用resolve方法，失败调用reject
                            resolvePromise(promise, nextValue, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise;
    }

    // Promise.all 静态方法
    static all(array) {
        let result = [];
        let index = 0;
        // Promise.all 返回一个Promise对象
        return new MyPromise((resolve, reject) => {
            let add = (key, value) => {
                result[key] = value;
                ++index;
                // 当all参数数组中所有项执行结束后执行resolve方法
                if (index === array.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; ++i) {
                // 如果是Promise对象
                if (array[i] instanceof MyPromise) {
                    array[i].then((value) => {
                        add(i, value);
                    }, reason => reject(reason))
                    // 普通值
                } else {
                    add(i, array[i]);
                }
            }
        })
    }
}

module.exports = MyPromise;