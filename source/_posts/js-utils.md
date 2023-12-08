---
title: js-utils
date: 2023-12-08 14:21:39
tags: javascript
categories: Javascript
index_img: /img/cover/0f7ab95b.webp
---
### 1.获取浏览器 Cookie 的值
使用 document.cookie 来获取 Cookie 的值。
```javascript
const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

cookie('_ga');
// Result: "GA1.2.1929736587.1601974046"
```

### 2.将 RGB 转换为十六进制
```javascript
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(0, 51, 255);
// Result: #0033ff`
```

### 3.复制到剪贴板
```javascript
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
copyToClipboard("Hello World");
```

### 4.找出一年中的某一天
查找日期中的某一天。
```javascript
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
dayOfYear(new Date());
// Result: 272
```

### 5.字符串首字母大写
Javascript 没有内置的大写函数，因此我们可以使用以下代码。
```javascript
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
capitalize("follow for more")
// Result: Follow for more
```

### 6.计算两天之间相差的天数
```javascript
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
dayDif(new Date("2020-10-21"), new Date("2021-10-22"))
// Result: 366
```

### 7.清除所有 Cookie
```javascript
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.\*/, `=;expires=${new Date(0).toUTCString()};path=/`));
```

### 8.生成随机十六进制
```javascript
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
console.log(randomHex());
// Result: #92b008
```

### 9.数组去重
```javascript
const removeDuplicates = (arr) => [...new Set(arr)];
console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 5, 5, 6]));
// Result: [ 1, 2, 3, 4, 5, 6 ]
```

### 10.从 URL 获取查询参数
通过 window.location 或原始 URL 轻松查询 goole.com?search=easy&page=3 的参数。
```javascript
const getParameters = (URL) => { 
    URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}');
    return JSON.stringify(URL);
};
getParameters(window.location)
// Result: { search : "easy", page : 3 }

/---------------or-------------/

Object.fromEntries(new URLSearchParams(window.location.search))

```

### 11.求平均值
使用 reduce 方法找到多个数字的平均值。
```javascript
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4);
// Result: 2.5
```

### 12.翻转字符串
使用split,reverse 和 join 方法轻松翻转字符串。
```javascript
const reverse = str => str.split('').reverse().join('');
reverse('hello world');
// Result: 'dlrow olleh'
```
### 13.检查数组是否为空
检查数组是否为空的简单代码，结果将返回 true 或 false。
```javascript
const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;
isNotEmpty([1, 2, 3]);
// Result: true
```
### 14.获取用户选定的文本
使用内置 getSelection 属性获取用户选择的文本。
```javascript
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```
### 15.检测用户是否处于暗模式
```javascript
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
console.log(isDarkMode) // Result: True or False

```
