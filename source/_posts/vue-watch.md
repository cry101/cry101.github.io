---
title: vue中watch的用法
date: 2019-01-19 14:41:00
tags: vue
categories: Vue
index_img: https://cdn.jsdelivr.net/gh/cry101/ImgHosting/img/vue-01.webp
---

### 1.immediate属性
发现watch的一个特点是最初绑定的时候不执行改变即第一次直接赋值不会监听到。
这里需要用到immediate属性，默认值为false,我们需要这样写immediate：true,即立刻执行。
```javascript
watch: {
    obj: {
        handler(newVal, oldVal) {
            console.log(newVal, oldVal)
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
    }
}
```

### 2.deep属性
deep代表是否深度监听，默认false，设置为true意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样开销性能就会非常大了，任何修改对象里面的一个属性都会触发这个监听器里的handler。
```javascript
// 比如修改obj.a的值，没有开启deep的时候不会监听到。
this.obj.a = 123

watch: {
    obj: {
        handler(newVal, oldVal) {
            console.log(newVal, oldVal)
        },
        deep: true
    }
}
```
还可以用字符串单独监听子元素:
```javascript
watch: {
    'obj.a': {
        handler(newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    }
}
```

### 3.注销watch
为什么要注销watch？因为我们的组件是经常要被销毁的，比如我们跳一个路由，从一个页面跳到另外一个页面，那么原来的页面的watch其实就没用了，这时候我们应该注销掉原来页面的watch的，不然的话可能会导致内置溢出。好在我们平时watch 都是写在组件的选项中的，他会随着组件的销毁而销毁。
```javascript
const app = new Vue({
    watch: {
        text(newVal, oldVal){
            console.log(`${newVal} : ${oldVal}`);
        }
    }
});
```
但是，如果我们使用下面这样的方式写watch，那么就要手动注销了，这种注销其实也很简单
```javascript
const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(${newVal} : ${oldVal});
})

unWatch(); // 手动注销watch
```

### 4.watch用于监听路由
```javascript
watch: {
    '$route'(to,from){
        console.log(to);   //to表示去往的界面
        console.log(from); //from表示来自于哪个界面
    }
}
```

### 5.与computed的区别
{% note info %}
computed
{% endnote %}
* 1.支持缓存，只有依赖数据发生改变，才会重新进行计算。
* 2.不支持异步，当computed内有异步操作时无效，无法监听数据的变化。
* 3.computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值。
* 4.如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed。
* 5.如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

{% note info %}
watch
{% endnote %}
* 1.不支持缓存，数据变，直接会触发相应的操作；
* 2.watch支持异步；
* 3.监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
* 4.当一个属性发生变化时，需要执行对应的操作，一对多；
* 5.监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
　　immediate：组件加载立即触发回调函数执行，
　　deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。