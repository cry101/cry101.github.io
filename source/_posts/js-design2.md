---
title: javascript 设计模式 - 单例模式
date: 2017-08-05 15:17:25
tags: javascript
categories: Javascript
---

### 1.概念
单例模式（Singleton Pattern）确保一个类只有一个实例，并提供一个访问它的全局访问点。
不论我们 new 了多少次，它都只给你返回第一次所创建的那唯一的一个实例。

### 2.单例的核心
{% note info %}
每次实例化都会产生一个新的对象这肯定不是单例模式
{% endnote %}
```javascript
class SingleCase{
    log(){
        console.log('我是一个单例对象')
    }
}
const singl1 = new SingleCase()
const singl2 = new SingleCase()
```

{% note info %}
通过闭包+构造方式单例写法
{% endnote %}

```javascript
// es5
function SingleCaseBase() {

}
SingleCaseBase.prototype.log = function () {
    console.log('我是一个单例对象')
}
SingleCase= (function() {
    let instance = null
    return function () {
        if (!instance) {
            instance = new SingleCaseBase()
        }
        return instance
    }
})()
const singl1 = SingleCase()
const singl2 = SingleCase()

```

```javascript
// es6
class SingleCase{
    log(){
        console.log('我是一个单例对象')
    }
    static getInstance(){
        if(!SingleCase.instance){
            SingleCase.instance = new SingleCase
        }
        return SingleCase.instance
    }
}
const singl1 = SingleCase.getInstance()
const singl2 = SingleCase.getInstance()
```

### 3.单例的优点
* (1) 由于单例模式在内存中只有一个实例，减少内存开支，特别是一个对象需要频繁地创建销毁时，而且创建或销毁时性能又无法优化,单例模式就非常明显了

* (2) 由于单例模式只生成一个实例，所以，减少系统的性能开销，当一个对象产生需要比较多的资源时，如读取配置，产生其他依赖对象时，则可以通过在应用启动时直接产生一个单例对象，然后永久驻留内存的方式来解决。

* (3) 单例模式可以避免对资源的多重占用，例如一个写文件操作，由于只有一个实例存在内存中，避免对同一个资源文件的同时写操作

* (4) 单例模式可以在系统设置全局的访问点，优化和共享资源访问，例如，可以设计一个单例类，负责所有数据表的映射处理。

### 4.单例的应用
类似vuex那样的状态管理
```javascript
class SingleState {
    // 状态存储机制
    data={}
    // 获取对象
    get(key){
        return this.data[key]||''
    }
    // 存储对象
    set(key,value){
        return  this.data[key]=value
    }
    // 外部调用此函数实例化
    static getInstance() {
        if (!SingleState.instance) {
            SingleState.instance = new SingleState
        }
        return SingleState.instance
    }
}
const state_1 = SingleState.getInstance()
state_1.set('hi','hello') // 设置 key = hi value = hello
const state_2 = SingleState.getInstance()
console.log(state_2.get('hi')) // hello
```