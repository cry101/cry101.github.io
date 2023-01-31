---
title: promise相关浅析
date: 2019-06-31 09:10:47
tags: [js, es6]
categories: Javascript
index_img: https://s2.loli.net/2023/01/31/vFELgeNfIHKhD1o.webp
---

### 1. Promise.all()
Promise.all() 接受一组 promises（或通常是一个可迭代的）。该函数返回一个 promise：

```javascript
const allPromise = Promise.all([promise1, promise2, ...]);
```
然后您可以使用 then-able 语法提取 Promise 解析的值：


```javascript
allPromise.then(values => {
  values; // [valueOfPromise1, valueOfPromise2, ...]
}).catch(error => {
  error;  // rejectReason of any first rejected promise
});
```
或 async/await语法：


```javascript
try {
  const values = await allPromise;
  values; // [valueOfPromise1, valueOfPromise2, ...]
} catch (error) {
  error;  // rejectReason of any first rejected promise
}
```

注意：
* promises 数组的顺序直接影响结果的顺序。
* 如果 promises 数组中至少有一个 promise 拒绝，则allPromise = Promise.all([...])rejects返回的promise也会被拒绝。

### 2. Promise.race()
接受参数和Promise.all()相同，但是类似赛跑机制，只返回最快出结果的promise。
