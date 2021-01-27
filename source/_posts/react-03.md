---
title: react的高阶组件
date: 2019-01-09 16:06:42
tags: react
---


### 1.高阶函数的概念
函数可以作为参数被传递；
函数可以作为返回值输出；
```javascript
// 时间函数的应用
setTimeout(function(){
	console.log("Hello word")
},1000);
//setInterval()

//ajax的应用
$.get('/api/getTime', function(){
	console.log('ok')
})

//数组中的应用
//some()、every()、filter()、map()和forEach() 

```

### 2.高阶组件的概念
