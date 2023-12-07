---
title: 前端面试题-1
date: 2017-08-29 15:29:14
tags: javascript
categories: Interview
index_img: /img/cover/11.png
---
### 1.js的数据类型相关
(1)基本数据类型
Undefined、Null、Boolean、Number、String
(2)typeof返回哪些数据类型
Object、function、number、boolean、underfind、string
```javascript
typeof null; // 'object'
typeof []; // 'object'
typeof {}; // 'object'

typeof new Number(123); // 'object' 包装对象,不要使用
new Number(123) === 123; // false
```
判断Array要使用Array.isArray(arr);
判断null请使用myVar === null;
判断某个全局变量是否存在用typeof window.myVar === 'undefined';
null和undefined没有toString()方法;
```javascript
123.toString(); // SyntaxError

123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
```

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
#### 4.1 如果字符串内部既包含'又包含"怎么办？
可以用转义字符\来标识，比如：
```javascript
'I\'m \"OK\"!'; //I'm "OK"!
```
转义字符\可以转义很多字符，比如\n表示换行，\t表示制表符，字符\本身也要转义，所以\\表示的字符就是\。
#### 4.2 多行字符串，之前用\n拼接，ES6用反引号``
#### 4.3 模板字符串
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
#### 4.4 slice,substr和substring的区别
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
#### 5.1 Array的length/索引赋值会导致Array的变化
#### 5.2 slice()
```javascript
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
```
#### 5.3 splice()
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
#### 5.4 split()和join()
```javascript
'A-B-C-1-2-3'.split("-")    //['A', 'B', 'C', 1, 2, 3]
['A', 'B', 'C', 1, 2, 3].join('-'); // 'A-B-C-1-2-3'
```

#### 5.5 map(),reduce(),filter()
```javascript
//map
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(x => x*x); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']

//reduce
var arr2 = [1, 3, 5, 7, 9];
arr2.reduce((x, y) => x + y); // 25
arr2.reduce((x, y) => x*10 + y) ;//13579

//filter
var arr3 = ['A', '', 'B', null, undefined, 'A', '  '];
arr3.filter(s => s && s.trim()); // ['A', 'B', 'C'] 除空字符串
arr3.filter((ele, index, self) => self.indexOf(ele) === index); 
//["A", "", "B", null, undefined, "  "] 去重
//参数表示某元素，元素的位置和数组本身

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

### 7.函数相关
#### 7.1 arguments对象
只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。
arguments类似Array但它不是一个Array。
arguments最常用于判断传入参数的个数。
```javascript
function foo(x) {
    alert(x); // 10
    if(arguments>1){
	    for (var i=0; i<arguments.length; i++) {
	        alert(arguments[i]); // 10, 20, 30
	    }
    }
}
foo(10, 20, 30);
```
arguments.callee返回此arguments对象所在的当前函数引用。
在使用函数递归调用时推荐使用arguments.callee代替函数名本身。
```javascript
function count(a){
	  if(a==1){
	     return 1;
	  } 
	  return a + arguments.callee(--a);
}
var mm = count(10);
```
ES6引入rest参数也能返回所有参数
```javascript
function sum(...rest) {
	  let sum = 0;
	  for(let i of rest){
	     sum += i
		}
		return sum
}
sum(2,3,5) //10
```
#### 7.2 this对象的理解
this总是指向函数的直接调用者（而非间接调用者）；
如果有new关键字，this指向new出来的那个对象；
在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；

#### 7.3 call() 和 apply() 的区别和作用
作用是控制this的指向。
apply()函数有两个参数：第一个参数是需要绑定的this变量，第二个参数是参数组成的数组。如果上下文是null，则使用全局对象代替。
如：function.apply(this,[1,2,3]);
call()的第一个参数是需要绑定的this变量，后续是实例传入的参数序列。
如：function.call(this,1,2,3);

利用apply()，我们还可以动态改变函数的行为。
```javascript
//统计一下代码一共调用了多少次parseInt()
var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};

// 测试:
parseInt('10');
parseInt('20');
parseInt('30');
count; // 3
```

#### 7.4 闭包
当函数里嵌套函数时，内部的函数可以访问外部函数里的变量。
```javascript
//创建一个匿名函数并立刻执行
(function (x) {
    return x * x;
})(3); // 9
```

#### 8 JSON的了解
JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。
它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小。
格式：采用键值对，例如：{'age':'12', 'name':'back'}
JSON.stringify() //序列化成JSON格式的字符串,第二个参数(array)用于控制筛选对象的键值
JSON.parse() //反序列化成JavaScript对象

#### 9 对象相关
### 9.1 new操作符具体干了什么
（1）创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
（2）属性和方法被加入到 this 引用的对象中。
（3）新创建的对象由 this 所引用，并且最后隐式的返回 this 。
用new创建的对象还从原型上获得了一个constructor属性，它指向构造函数本身。

### 9.2 JavaScript如何实现继承
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
更好的继承,通过引入空函数
```javascript
function inherits(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
```









### 10.你有哪些性能优化的方法
（1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
（4） 当需要设置的样式很多时设置className而不是直接操作style。
（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
（6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
（7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

### 11.ajax过程
(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象.
(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
(3)设置响应HTTP请求状态变化的函数.
(4)发送HTTP请求.
(5)获取异步调用返回的数据.
(6)使用JavaScript和DOM实现局部刷新.

### 12.AMD和CMD的区别
AMD（异步模块定义） 是 RequireJS 在推广过程中对模块定义的规范化产出。
CMD（通用模块定义） 是 SeaJS 在推广过程中对模块定义的规范化产出。
（1）AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行。
（2）CMD 推崇依赖就近，AMD 推崇依赖前置。
```javascript
// CMD
define(function(require, exports, module) {
   var a = require('./a')
   a.doSomething()   
   // 此处略去 100 行   
   var b = require('./b') // 依赖可以就近书写   
   b.doSomething()   // ... })

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {  
	// 依赖必须一开始就写好    
	a.doSomething()    
	// 此处略去 100 行    
	b.doSomething()    
	...
})
```
(3)AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。
CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。


### 13.从输入URL到页面加载发生了什么?
(1)DNS解析 域名解析成ip地址
递归查询的过程，本地域名服务器->根域名服务器->顶级域名服务器，得到ip后缓存到本地。
DNS的负载均衡，又称DNS的重定向，CDN(Content Delivery Network)就是利用DNS的重定向技术，
DNS服务器会返回一个跟用户最接近的点的IP地址给用户，CDN节点的服务器负责响应用户的请求

(2)与WEB服务器建立TCP连接（三次握手）

(3)浏览器发送HTTP请求

(4)服务器响应请求：查找客户端请求的资源，并返回响应报文。
响应报文中包括一个重要的信息——状态码
2xx（成功）
	200响应成功，
3xx （重定向）
	301（永久移动）请求的网页已永久移动到新位置，
	302（临时移动）
	304 使用缓存
4xx（请求错误）
	400（错误请求） 服务器不理解请求的语法。
	401（未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
	403（禁止） 服务器拒绝请求。
	404（未找到） 服务器找不到请求的网页。
5xx（服务器错误）
	500（服务器内部错误） 服务器遇到错误，无法完成请求
	503（服务不可用） 服务器目前无法使用（由于超载或停机维护）
	
(5)服务器返回相应文件给浏览器。

(6)Tcp连接释放(四次挥手)。
为什么多发一次包？TCP连接是全双工的，因此每个方向要单独关闭。

(7)浏览器对HTML文件进行解析构建DOM树 ，构建渲染树 ，js根据DomAPI操作执行绑定事件等，页面显示完成。
由于是基于单线程的事件轮询，所以会被脚本，样式阻塞。
一旦解析器被阻塞，浏览器就会收到绘制请求。


### 14.浏览器缓存机制
强缓存：
用户发送的请求，直接从客户端缓存中获取，不发送请求到服务器，不与服务器发生交互行为。
协商缓存：
用户发送的请求，发送到服务器后，由服务器判定是否从缓存中获取资源。