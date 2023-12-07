---
title: JSON.parse 和 JSON.stringify
date: 2017-01-14 10:15:12
tags: javascript
categories: Javascript
index_img: /img/cover/other.jpg
---


### 1.parse用于从一个字符串中解析出json对象,如

```javascript
var str = '{"name":"huangxiaojian","age":"23"}'
```
结果：

```javascript
JSON.parse(str)

Object

age: "23"
name: "huangxiaojian"
__proto__: Object
```

注意：单引号写在{}外，每个属性名都必须用双引号，否则会抛出异常。



### 2.stringify()用于从一个对象解析出字符串，如
```javascript
var a = {a:1,b:2}
```
结果：
```javascript
JSON.stringify(a)

"{"a":1,"b":2}" 
```