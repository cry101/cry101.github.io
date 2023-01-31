---
title: promise相关实现
date: 2019-08-20 15:30:33
tags: [js, es6]
categories: Javascript
index_img: https://s2.loli.net/2023/01/31/vFELgeNfIHKhD1o.webp
---


### 1.简单实现Promise
* Promise存在三个状态（state）pending、fulfilled、rejected
* pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
* 状态只能从pending变为fulfilled或者rejected
* 如果函数报错，直接执行reject
* Promise有个then方法
```javascript
class Promise {
    constructor(executor) {
        // Promise存在三个状态（state）pending、fulfilled、rejected 初始pending
        this.state = 'pending'
        // 成功的返回值
        this.value = undefined
        // 失败的原因
        this.reason = undefined

        // 成功
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled' // 改变状态
                this.value = value
            }
        }
        // 失败
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected' // 改变状态
                this.reason = reason
            }
        }

        // 如果executor执行报错，直接执行reject
        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    // then 方法 有两个参数onFulfilled onRejected
    then(onFulfilled, onRejected) {
        // 状态成功执行onFulfilled并返回成功的值
        if (this.state === 'fulfilled') {
            onFulfilled(this.value)
        }
        // 状态失败执行onRejected并返回失败的值
        if (this.state === 'rejected') {
            onRejected(this.reason)
        }
    }
}
```

### 2.异步实现和链式调用
* 当resolve在setTomeout内执行，then时state还是pending等待状态，需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
* 一个promise可以有多个then
* 为了达成链式，我们默认在第一个then里返回一个promise
```javascript
class Promise {
    constructor(executor) {
        // Promise存在三个状态（state）pending、fulfilled、rejected 初始pending
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        // 成功存入的数组
        this.onResolvedCallbacks = []
        // 失败存入的数组
        this.onRejectedCallbacks = []

        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                // 执行数组里的函数
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                // 执行数组里的函数
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFulfilled, onRejected) {
        // 声明返回的promise2
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                resolvePromise(promise2, x, resolve, reject);
            }
            if (this.state === 'rejected') {
                let x = onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject);
            }
            // new 异步时状态还是pending
            if (this.state === 'pending') {
                // 成功的存入成功数组在resolve里执行
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject);
                })
                // 失败的存入失败数组在reject里执行
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        })
        // 返回promise2 完成链式
        return promise2
    }
}
```

### 3.避免互相套用
```javascript
function resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    if(x === promise2){
        // reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') { 
            // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
            then.call(x, y => {
                // 成功和失败只能调用一个
                if (called) return;
                called = true;
                // resolve的结果依旧是promise 那就继续解析
                resolvePromise(promise2, y, resolve, reject);
            }, err => {
                // 成功和失败只能调用一个
                if (called) return;
                called = true;
                reject(err);// 失败了就失败了
            })
        } else {
            resolve(x); // 直接成功即可
        }
        } catch (e) {
            // 也属于失败
            if (called) return;
            called = true;
            // 取then出错了那就不要在继续执行了
            reject(e); 
        }
    } else {
        resolve(x);
    }
}
```

### 4.其他方法
```javascript
//resolve方法
Promise.resolve = function(val){
    return new Promise((resolve,reject)=>{
        resolve(val)
    });
}
//reject方法
Promise.reject = function(val){
    return new Promise((resolve,reject)=>{
        reject(val)
    });
}
//race方法 
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(resolve,reject)
        };
    })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
    let arr = [];
    let i = 0;
    function processData(index,data){
        arr[index] = data;
        i++;
        if(i == promises.length){
            resolve(arr);
        };
    };
    return new Promise((resolve,reject)=>{
        for(let i = 0; i < promises.length; i++){
            promises[i].then(data=>{
                processData(i,data);
            },reject);
        };
    });
}
```