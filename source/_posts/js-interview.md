---
title: 前端面试题(基础)
date: 2017-08-29 15:29:14
tags: javascript
---
### 1.js的数据类型相关
(1)基本数据类型
Undefined、Null、Boolean、Number、String
(2)JavaScript的typeof返回哪些数据类型:
Object、function、number、boolean、underfind、string

### 2.==和===的区别
(1)==包含隐式类型转换，===类型不同则结果不同
(2)对于Array,Object等高级类型，==和===是没有区别的，进行“指针地址”比较
(3)==的隐式类型转换应遵循一下几条规则：
    <1>布尔值转数值 false->0,true->1
    <2>字符串和数值比较，先将字符串转数值 'false'->NaN
    <3>对象和其他比较，先调用对象valueOf()方法，用得到的基本类型值按照前面的规则进行比较。
```javascript
null === null //true
undefined === undefined //true

false == 'false'  //false  false->0 'false'->NaN
false == '0' //true

'' == '0' //false 不转
0 == '' //true ''->0
0 == '0' //true

null == undefined //true

' \t\r\n ' == 0     // true
```
NaN与所有其他值都不等
```javascript
NaN === NaN; // false

//唯一能判断NaN的方法是通过isNaN()函数
isNaN(NaN); // true
```

### 3.null和undefined的区别
(1)null表示一个空的值，转为数值时为0，多数情况用null
(2)undefined表示值未定义，转为数值时为NaN
(3)if里把null、undefined、0、NaN和空字符串''视为false，其他值一概视为true
undefined：
（1）变量被声明了，但没有赋值时，就等于undefined。
（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。
null：
（1） 作为函数的参数，表示该函数的参数不是对象。
（2） 作为对象原型链的终点。

### 4.字符串相关
(1)如果字符串内部既包含'又包含"怎么办？
可以用转义字符\来标识，比如：
```javascript
'I\'m \"OK\"!'; //I'm "OK"!
```
转义字符\可以转义很多字符，比如\n表示换行，\t表示制表符，字符\本身也要转义，所以\\表示的字符就是\。
(2)多行字符串，之前用\n拼接，ES6用反引号``
(3)模板字符串
```javascript
//old
var name = '小明';
var age = 20;
var message = '你好, ' + name + ', 你今年' + age + '岁了!';
//ES6
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
```
(4)slice,substr和substring的区别
slice和substring接收的是起始位置和结束位置(不包括结束位置)，而substr接收的则是起始位置和所要返回的字符串长度。
```javascript
var test = 'hello world';

test.substr(4,7) //o world
test.slice(4,7) //o w
test.substring(4,7) //o w
test.substring(7,4) //o w  按大小排

//负数时
test.slice(-3) //rld  如果start为负数，则start=str.length+start。
test.substring(-3) //hello world  直接将负数转成0
test.substr(-3) //rld  如果start为负数，则start=str.length+start。

test.slice(3,-4) //lo w  如果end为负数，则end=str.length+end。
test.substring(3,-4) //hel  直接将负数转成0
test.substr(3,-4) //空字符串  如果end为负数，则转为0。
```

### 5.数组相关
(1)Array的length/索引赋值会导致Array的变化
(2)slice()
```javascript
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
```
(3)splice()
```javascript
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```
(4)split()和join()
```javascript
'A-B-C-1-2-3'.split("-")    //['A', 'B', 'C', 1, 2, 3]
['A', 'B', 'C', 1, 2, 3].join('-'); // 'A-B-C-1-2-3'
```

### 6.for...in和for...of的区别
(1)for...of是ES6提出用来遍历iterable类型的,只循环集合本身的元素
(2)for...in是遍历对象的属性名称
```javascript
var a = ['A', 'B', 'C'];
a.name = 'Hello';
//for...in包括name,但Array的length却不包括
for (var x in a) {
    alert(x); // '0', '1', '2', 'name'
}
for (var x of a) {
    alert(x); // 'A', 'B', 'C'
}
//更好的用forEach(iterable内置方法)
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    alert(element);
});
```
(3)forEach对Set和map的区别：
Set没有索引，因此回调函数的前两个参数都是元素本身；
Map的回调函数参数依次为value、key和map本身

### 5.this对象的理解
this总是指向函数的直接调用者（而非间接调用者）；
如果有new关键字，this指向new出来的那个对象；
在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；

### 6.new操作符具体干了什么
（1）创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
（2）属性和方法被加入到 this 引用的对象中。
（3）新创建的对象由 this 所引用，并且最后隐式的返回 this 。

### 7.JSON 的了解
JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小。
格式：采用键值对，例如：{'age':'12', 'name':'back'}

### 8.call() 和 apply() 的区别和作用
apply()函数有两个参数：第一个参数是上下文，第二个参数是参数组成的数组。如果上下文是null，则使用全局对象代替。
如：function.apply(this,[1,2,3]);
call()的第一个参数是上下文，后续是实例传入的参数序列。
如：function.call(this,1,2,3);

### 9.你有哪些性能优化的方法
（1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
（4） 当需要设置的样式很多时设置className而不是直接操作style。
（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
（6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
（7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

### 10.ajax过程
(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象.
(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
(3)设置响应HTTP请求状态变化的函数.
(4)发送HTTP请求.
(5)获取异步调用返回的数据.
(6)使用JavaScript和DOM实现局部刷新.


### 11.JavaScript如何实现继承
一般使用构造函数与原型混合方式
```javascript
function Parent(){
    this.name = 'wang';
}

function Child(){
    this.age = 28;
}
Child.prototype = new Parent();//继承了Parent，通过原型
var demo = new Child();
alert(demo.age);
alert(demo.name);//得到被继承的属性
```



