---
title: try catch的理解
date: 2019-04-29 11:14:32
tags: javascript
---

### 异常能否被try catch到？
能被 try catch 捕捉到的异常，必须是在报错的时候，线程执行已经进入 try catch 代码块，且处在 try catch 里面，这个时候才能被捕捉到。

#### 1.try catch之前(否)
代码报错的时候，线程执行未进入 try catch，那么无法捕捉异常。

比如语法异常（syntaxError），因为语法异常是在语法检查阶段就报错了，线程执行尚未进入 try catch 代码块，自然无法捕获到异常。
```javascript
try{
    a.
}catch(e){
    console.log("error",e);
}
// output
Uncaught SyntaxError: Unexpected token '}'
```

### 2.try catch之中(是)
代码报错的时候，线程执行处于 try catch 之中，则能捕捉到异常。
```javascript
try{
    function d(){a.b;}
   d();
}catch(e){
    console.log("error",e);
}
// output
error ReferenceError: a is not defined
```

### 3.try catch之后(否)
代码报错的时候，线程已经执行完 try catch，这种不能捕捉到异常。

```javascript
try{
    setTimeout(()=>{
        console.log(a.b);
    }, 100)
}catch(e){
    console.log('error',e);
}
console.log(111);
//output
111
Uncaught ReferenceError: a is not defined


try{
   function d(){a.b;}
}catch(e){
     console.log("error",e);
}
console.log(111);
d();
// output
111
Uncaught ReferenceError: a is not defined
```

### 4.Promise 没异常
相对于外部 try catch，Promise 永远没有异常！Promise 的异常都是由 reject 和 Promise.prototype.catch 来捕获，不管是同步还是异步。
```javascript
try{
    new Promise(function (resolve, reject) {
        a.b;
    }).then(v=>{
        console.log(v);
    });
}catch(e){
    console.log('error',e);
}
// output
Uncaught (in promise) ReferenceError: a is not defined
```
核心原因是因为 Promise 在执行回调中都用 try catch 包裹起来了，其中所有的异常都被内部捕获到了，并未往上抛异常。

### 5.常用try catch判断是否json
```javascript
let data = '{ a: 1}' // 判断是否json结构
try {
    const res = JSON.parse(data)
    // console.log(res)
} catch (e) {
    console.log('error：' + e)
}
```