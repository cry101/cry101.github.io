---
title: javascript 设计模式 - 模板方法/策略/中介者
date: 2017-07-27 16:27:35
tags: javascript
categories: Javascript
index_img: https://s2.loli.net/2023/01/31/vFELgeNfIHKhD1o.webp
---

### 1.模板方法模式
定义一个操作中的算法骨架，将一些步骤延迟到子类中。
模板方法使用继承来改变算法的一部分，而策略模式用委托来改变整个算法。
```javascript
//泡咖啡
var Coffee = function(){};

Coffee.prototype.boilWater = function(){
    console.log('把水煮沸');
}
Coffee.prototype.brewCoffee = function(){
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addSugarAndMilk = function(){
    console.log('加糖和牛奶');
}
Coffee.prototype.init = function(){
    this.boilWater();
    this.brewCoffee();
    this.pourInCup();
    this.addSugarAndMilk();
}

//泡茶
var Tea = function(){};

Tea.prototype.boilWater = function(){
    console.log('把水煮沸');
}
Tea.prototype.steepTea = function(){
    console.log('用沸水浸泡茶叶');
}
Tea.prototype.pourInCup = function(){
    console.log('把茶水倒进杯子');
}
Tea.prototype.addLemon = function(){
    console.log('加柠檬');
}
Tea.prototype.init = function(){
    this.boilWater();
    this.steepTea();
    this.pourInCup();
    this.addLemon();
}

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
```

模板方法重构：分离共同点
```javascript
//饮料(父类)
var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log('把水煮沸');
}
Beverage.prototype.brew = function(){
    throw new Error('子类必须重写该方法');
}
Beverage.prototype.pourInCup = function(){
    throw new Error('子类必须重写该方法');
}
Beverage.prototype.addCondiments = function(){
    throw new Error('子类必须重写该方法');
}
Beverage.prototype.customerWantsCondiments = function(){
    //钩子方法，是否加调料
    return true;
}
Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if(this.customerWantsCondiments()){
        this.addCondiments();
    }
    
}

//泡咖啡
var Coffee = function(){};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function(){
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addCondiments = function(){
    console.log('加糖和牛奶');
}

//泡茶
var Tea = function(){};
Tea.prototype = new Beverage();
Tea.prototype.brew = function(){
    console.log('用沸水浸泡茶叶');
}
Tea.prototype.pourInCup = function(){
    console.log('把茶水倒进杯子');
}
Tea.prototype.addCondiments = function(){
    console.log('加柠檬');
}
Tea.prototype.customerWantsCondiments = function(){
    return window.confirm('请问需要加调料吗？');//是否加调料
}



var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
```

### 2.策略模式
定义一系列算法，一个个封装起来，并且可以相互替换。
模式作用：
* （1）所有的这些算法都是做相同的事情，只是实现不同。
* （2）以相同的方式调用所有的方法，减少各种算法类与使用算法类之间的耦合。
* （3）单独定义算法类，方便单元测试
```javascript
//年终奖 = 考核等级*基本工资
var calculateBonus = function(level,salary){
    if(level === 'S'){
        return salary*4;
    }

    if(level === 'A'){
        return salary*3;
    }

    if(level === 'B'){
        return salary*2;
    }
};
calculateBonus('S',2000);
```

```javascript
/**
* 策略模式代码重构：
* 方便代码扩展，不会使主函数越来越庞大，核心逻辑不需修改
*/
var strategies = {
    S(salary) {
        return salary*4;
    },
    A(salary) {
        return salary*3;
    },
    B(salary) {
        return salary*2;
    },
    C(salary) {
        return salary*1.5;
    }
}
var calculateBonus = function(level,salary){
    return strategies[level](salary);
};
calculateBonus('S',2000);
```

### 3.中介者模式
用一个中介对象来封装一系列的对象交互。
```javascript
var Plane = function(name){

}
Plane.prototype.send = function(msg,to){
    console.log(this.name+'发送了信息')
    tower.send(msg,to);
}
Plane.prototype.receive = function(msg){
    console.log(this.name + '[接受到]' + msg);
}
//中介对象
var tower = {
    all:{},
    register: function(t){
        this.all[t.name] = t; 
    },
    send: function(msg,to){
        this.all[to.name].receive(msg)
    }
}

var plane1 = new Plane('plane1');
var plane2 = new Plane('plane2');
tower.register(plane1);
tower.register(plane2);
//飞机1通过塔台发送消息给飞机2
plane1.send('我马上降落，还有200米'，plane2);
```
