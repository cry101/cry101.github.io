---
title: 防抖和节流
date: 2017-05-05 11:06:01
tags: javascript
categories: Javascript
index_img: /img/cover/0f7ab95b.webp
---

### 1.防抖
顾名思义，防止抖动，以免把一次事件误认为多次。

常用场景
* 1.登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
* 2.调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
* 3.文本编辑器实时保存，当无任何更改操作一秒后进行保存

```javascript
// 防抖重在清零 
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this; // 保存this指向
        let args = arguments; // 拿到event对象

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args)
        }, wait)
    }
}

function debounce (f, wait = 1000) {
     let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            f(...args)
        }, wait)
    }
}
```

### 2.节流
控制事件发生的频率，如控制为1s发生一次，甚至1分钟发生一次。

常用场景：
* 1.scroll 事件，每隔一秒计算一次位置信息等
* 2.浏览器播放事件，每个一秒计算一次进度信息等
* 3.input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求 (也可做防抖)

```javascript
// 节流重在加锁
function throttle (f, wait = 1000) {
    let timer
    return (...args) => {
        if (timer) { return }
        timer = setTimeout(() => {
            f(...args)
            timer = null
        }, wait)
    }
}

function throttle(f, delay) {
    var statTime = 0
    return function() {
        var currTime = +new Date()
        if (currTime - statTime > delay) {
            f.apply(this, arguments)
            statTime = currTime
        }
    }
}
```