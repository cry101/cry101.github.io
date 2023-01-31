---
title: javascript 设计模式 - 观察者/发布订阅
date: 2017-09-03 17:20:25
tags: javascript
categories: Javascript
index_img: https://s2.loli.net/2023/01/31/vFELgeNfIHKhD1o.webp
---

### 1.观察者模式
#### （1）概念
观察者模式指的是一个对象（Subject）维持一系列依赖于它的对象（Observer），当有关状态发生变更时 Subject 对象则通知一系列 Observer 对象进行更新。

观察者模式大多时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。

#### （2）案例
在观察者模式中，Subject 对象拥有添加、删除和通知一系列 Observer 的方法等等，而 Observer 对象拥有更新方法等等。
```javascript
// 定义一个主体对象
class Subject {
    constructor() {
        this.Observers = [];
    }
    add(observer) { //添加
        this.Observers.push(observer)
    }
    remove(observer) {//移除
        this.Observers.filter(item => item === observer);
    }
    notify() {
        this.Observers.forEach(item => {
            item.update();
        })
    }
}
//定义观察着对象
class Observer {
    constructor(name) {
        this.name = name;
    }
    update() {
        console.log(`my name is:${this.name}`);
    }
}
 
//测试
let sub = new Subject();
let obs1 = new Observer('leaf111');
let obs2 = new Observer('leaf222');
sub.add(obs1); // my name is:leaf111
sub.add(obs2); // my name is:leaf222
sub.notify();
```
我们创建了 Subject 对象和两个 Observer 对象，当有关状态发生变更时则通过 Subject 对象的 notify 方法通知这两个 Observer 对象，这两个 Observer 对象通过 update 方法进行更新。

#### （3）应用场景
* 1、 对一个对象状态的更新，需要其他对象同步更新，而且其他对象的数量动态可变。
* 2、 对象仅需要将自己的更新通知给其他对象而不需要知道其他对象的细节。


### 2.发布订阅模式
#### (1)概念
发布订阅模式指的是希望接收通知的对象（Subscriber）基于一个主题通过自定义事件订阅主题，被激活事件的对象（Publisher）通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。

发布-订阅模式大多数时候是异步的（使用消息队列）,一对多的。
#### (2)案例
```javascript
let pubSub = {
    subs: [], // 订阅者列表
    subscribe(key, fn) { //订阅函数
        if (!this.subs[key]) {
            this.subs[key] = [];
        }
        this.subs[key].push(fn);
    },
    publish(...arg) {//发布函数
        let args = arg;
        let key = args.shift();
        let fns = this.subs[key];
    
        if (!fns || fns.length <= 0) return;
    
        for (let i = 0, len = fns.length; i < len; i++) {
            fns[i](args);
        }
    },
    unSubscribe(key) { //解除订阅
        delete this.subs[key]
    }
}
 
//测试
pubSub.subscribe('name', name => {
  console.log(`your name is ${name}`);
})
pubSub.subscribe('gender', gender => {
  console.log(`your name is ${gender}`);
})
pubSub.publish('name', 'leaf333');  // your name is leaf333
pubSub.publish('gender', '18');  // your gender is 18
```

### 4.两个模式的区别
* 1、在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。

* 2、在发布订阅模式中，发布者和订阅者，是完全解耦的，而观察者模式是松耦合。 

* 3、观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。

### 4.vue2.0中的作用
Vue会遍历实例的data属性，把每一个data都设置为访问器，然后在该属性的getter函数中将其设为watcher，在setter中向其他watcher发布改变的消息。
```javascript
//遍历传入实例的data对象的属性，
// 将其设置为Vue对象的访问器属性
function observe(obj,vm){
    Object.keys(obj).forEach(function(key){
        defineReactive(vm,key,obj[key]);
    });
}
//设置为访问器属性，并在其getter和setter函数中，使用订阅发布模式。互相监听。
function defineReactive(obj,key,val){
    // 这里用到了观察者模式,它定义了一种一对多的关系，
    // 让多个观察者监听一个主题对象，这个主题对象的状态发生改变时会通知所有观察者对象，
    // 观察者对象就可以更新自己的状态。

    //实例化一个主题对象，对象中有空的观察者列表
    var dep = new Dep();
    //将data的每一个属性都设置为Vue对象的访问器属性，属性名和data中相同
    //所以每次修改Vue.data的时候，都会调用下边的get和set方法。
    // 然后会监听v-model的input事件，当改变了input的值，就相应的改变Vue.data的数据，然后触发这里的set方法
    Object.defineProperty(obj,key,{
        get: function(){
            //Dep.target指针指向watcher，增加订阅者watcher到主体对象Dep
            if(Dep.target){
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function(newVal){
            if(newVal === val){
                return
            }
            val = newVal;
            //console.log(val);
            //给订阅者列表中的watchers发出通知
            dep.notify();
        }
    });
}

//主题对象Dep构造函数
function Dep(){
    this.subs = [];
}
//Dep有两个方法，增加订阅者  和  发布消息
Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub);
    },
    notify: function(){
        this.subs.forEach(function(sub){
            sub.update();
        });
    }
}
```
