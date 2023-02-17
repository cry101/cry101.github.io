---
title: js的call、apply、bind的区别
date: 2020-07-17 14:15:13
tags: javascript
categories: Javascript
index_img: https://s2.loli.net/2023/02/03/kvmhbc2gwsYTPzG.webp
---

### 1.call
call()可以传递两个参数，第一个参数是指定函数内部中this的指向，第二个参数是函数调用时需要传递的参数。
改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次。

```javascript
// 实现call方法
Function.prototype.myCall = function (context) {
    // 判断调用对象
    if (typeof this != "function") {
        throw new Error("type error");
    }
    // 首先获取参数
    let args = [...arguments].slice(1);
    let res = null;
    // 判断context是否传入，如果没有，就设置为window
    context = context || window;
    // 将被调用的方法置入context的属性
    // this 即为要调用的方法
    context.fn = this;
    // 执行要被调用的方法
    res = context.fn(...args);
    // 删除手动增加的属性方法
    delete context.fn;
    // 执行结果返回
    return res;
}
```

### 2.apply
apply()接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入。
改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次。
```javascript
// 实现apply方法
Function.prototype.myApply = function(context) {
    if (typeof this != "function") {
        throw new Error("type error");
    }
    let res = null;
    context = context || window;
    // 使用 symbol 来保证属性唯一
    // 也就是保证不会重写用户自己原来定义在context中的同名属性
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    // 执行被调用的方法
    if (arguments[1]) {
        res = context[fnSymbol](...arguments[1]);
    } else {
        res = context[fnSymbol]();
    }
    delete context[fnSymbol];
    return res;
}
```

### 3.bind
bind()方法的第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)。
改变this指向后不会立即执行，而是返回一个永久改变this指向的函数。
```javascript
// 实现bind方法
Function.prototype.myBind = function (context) {
    if (typeof this != "function") {
        throw new Error("type error");
    }
    let args = [...arguments].slice(1);
    const fn = this;
    return function Fn() {
        return fn.apply(
            this instanceof Fn ? this : context,
            // 当前这个 arguments 是指 Fn 的参数
            args.concat(...arguments)
        );
    };
}
```

### 4.区别
* 共同点：改变函数执行时的上下文，简而言之就是改变函数运行时的this指向。

* 不同点：
call()和bind()第二个参数是列表形式的；apply()第二个参数是数组形式。
call()和apply()是立即执行；bind()不会立即执行而是生成一个修改this之后的新函数。

### 5.应用
#### （1）将伪数组转化为数组
```javascript
case1: dom节点：

<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>

let div = document.getElementsByTagName('div');
console.log(div); // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性

let arr2 = Array.prototype.slice.call(div);
console.log(arr2); // 数组 [div.div1, div.div1, div.div1]
```

```javascript
case2: fn内的arguments

function fn10() {
    return Array.prototype.slice.call(arguments);
}
console.log(fn10(1,2,3,4,5)); // [1, 2, 3, 4, 5]
```

#### （2）利用call和apply做继承
```javascript
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        console.log(this.name);      
    }      
}      

function Cat(name){    
    Animal.call(this, name);    
}      

// Animal.call(this) 的意思就是使用this对象代替Animal对象，那么
// Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了
var cat = new Cat("TONY");     
cat.showName();   //TONY
```
#### （2）多继承
```javascript
function Class1(a,b) {
    this.showclass1 = function(a,b) {
        console.log(`class1: ${a},${b}`);
    }
}

function Class2(a,b) {
    this.showclass2 = function(a,b) {
        console.log(`class2: ${a},${b}`);
    }
}

function Class3(a,b,c) {
    Class1.call(this);
    Class2.call(this);
}

let arr10 = [2,2];
let demo = new Class3();
demo.showclass1.call(this,1); // class1: 1,undefined
demo.showclass1.call(this,1,2); // class1: 1,1
demo.showclass2.apply(this,arr10); // class2: 1,2

```

### 6.箭头函数的this
* 箭头函数是定义函数一种新的方式，比普通函数定义更加方便和简单。
* 箭头函数不绑定this，会捕获其所在上下文的this，作为自己的this。
* 箭头函数不能用作构造函数，也就是说不可以使用new命令，否则会抛出错误。
* 箭头函数不绑定arguments，取而代之用rest参数解决，同时没有super和new.target。
* 使用call，apply，bind并不会改变箭头函数中的this指向。对箭头函数使用call或apply方法时，只会传入参数并调用函数；对箭头函数使用bind方法时，只会返回一个预设参数的新函数，并不会改变这个新函数的this指向。