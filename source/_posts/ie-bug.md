---
title: ie下相关兼容性问题
date: 2017-10-09 15:21:42
tags: [javascript,ie]
---
[CAN I USE](http://caniuse.com/)
### 1.Invalid Date,new Date()时间格式不对
当在IE/Firefox浏览器下，会遇到这种问题：
```javascript
new Date('2016-01-01 00:00:00')    //却返回这个值Invalid Date，转换失败
```
解决方式：
```javascript
var date="2016-01-01 00:00:00";
date=date.replace(new RegExp(/-/gm) ,"/"); 　　//将所有的'-'转为'/'即可
//2016/01/01 00:00:00
new Date(date);//这下就转换正确了Wed Jan 1 00:00:00 UTC+0800 2014
```
以下列出了所有浏览器都支持的方式:
```javascript
var d = new Date(2011, 01, 07); // yyyy, mm-1, dd
var d = new Date(2011, 01, 07, 11, 05, 00); // yyyy, mm-1, dd, hh, mm, ss
var d = new Date("02/07/2011"); // "mm/dd/yyyy"
var d = new Date("02/07/2011 11:05:00"); // "mm/dd/yyyy hh:mm:ss"
var d = new Date(1297076700000); // milliseconds
var d = new Date("Mon Feb 07 2011 11:05:00 GMT"); // ""Day Mon dd yyyy hh:mm:ss GMT/UTC
```

### 2.ie9下没有promise对象
使用axios需要[babel-polyfill](https://babeljs.io/docs/usage/polyfill/)支持
```javascript
npm install --save babel-polyfill
```
在webpack.config.js里：
```javascript
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

### 3.ie8不支持forEach
拓展方法
```javascript
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function forEach( callback, thisArg ) {
    var T, k;
    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if ( typeof callback !== "function" ) {
      throw new TypeError( callback + " is not a function" );
    }
    if ( arguments.length > 1 ) {
      T = thisArg;
    }
    k = 0;
    while( k < len ) {
      var kValue;
      if ( k in O ) {
        kValue = O[ k ];
        callback.call( T, kValue, k, O );
      }
      k++;
    }
  };
}
```

### 4.对象不支持addEventListener属性或方法
jquery 2.x以上版本不支持ie8
```javascript
//判断IE7\8 兼容性检测
var isIE=!!window.ActiveXObject;
var isIE6=isIE&&!window.XMLHttpRequest;
var isIE8=isIE&&!!document.documentMode;
var isIE7=isIE&&!isIE6&&!isIE8;

if(isIE8 || isIE7){
   li.attachEvent("onclick",function(){
	   _marker.openInfoWindow(_iw);
   })
}else{
   li.addEventListener("click",function(){
	   _marker.openInfoWindow(_iw);
   })
}
```

