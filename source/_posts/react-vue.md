---
title: react和vue的比较
date: 2018-03-26 17:27:45
tags: [react, vue, jquery]
categories: React
index_img: /img/cover/7.jpg
---


### 1.相比较jquery
jquery是使用选择器（$）选取DOM对象，对其进行赋值、取值、事件绑定等操作，
其实和原生的javascript的区别只在于可以更方便的选取和操作DOM对象,还有jquery更好的封装性，兼容性。
比如说添加个事件监听：
```javascript
//如果用js需要做兼容
if (typeof document.addEventListener != "undefined") { 
	document.addEventListener("mousedown",XXX,true); //google
} else { 
	document.attachEvent("onmousedown",XXX); //IE
} 
```
使用jquery纯dom操作，太多的浏览器事件会导致监听混乱/项目不好维护/占用很大的内存。
而且它在客观上没有推动开发者了解和使用抽象程度更高的领域。
包括但不限于数据结构，设计模式，数据流，抽象数据类型，抽象过程等。




而Vue.js 专注于 MVVM 模型的 ViewModel 层，通过数据驱动视图。
模块化的开发，组件式的思想，更加高效，更加友好
Vue已经解决了之前jQuery很多痛点：
1.无需担心DOM回调，这种复杂性已经被封装。Vue的生命周期挂钩将允许更精确的控制，如果它需要。
2.在数据属性counter和它渲染输出DOM节点之间有一个明显的之间的链接。
3.我们没有模棱两可的API方法需要查找或记住。不同的功能被很好的组织和分层在Vue构造函数对象中，
或能通过指令直接应用到模板中的DOM节点，这些指令提供更多的易于理解的上下文。

比如 React ，一开始就必须接受 view = f (state) 的思想。
几乎稍微深入的使用，就会开始思考数据的互传，进而是单向数据流，最后深入到各种数据流方案的讨论和选择。

持续集成：项目上线并不是完事大吉了，后续我们还要面临需求迭代、bug修复、合作甚至交接等其他问题。
因此一个可持续集成的工程化项目架构就显得尤为重要，项目架构和技术栈的选择往往是密不可分的，但二者并不存在必然关系。
比如在没有ES6的年代，我们依然可以使用RequireJS或者seajs来达到js的模块化，
没有webpack，我们还可以依靠Grunt或者gulp来构建我们的项目。


### 2.vue和react的优化
React 的 Virtual DOM 也不是不需要优化的。
复杂的应用里你有两个选择：
 1. 手动添加 shouldComponentUpdate 来避免不需要的 vdom re-render；
 2. Components 尽可能都用 pureRenderMixin，然后采用 Flux 结构 + Immutable.js。
 
Vue采用依赖追踪，默认就是优化状态，通过Object.defineProperty的getter/setter来追踪数据，改了多少数据，就触发多少更新。


### 3.开发风格不同
react采用jsx语法 + inline style，把html和css整合进javascript，
在逻辑表达上比模版的清晰，但是复杂逻辑很容易写出凌乱的render函数。

vue采用单文件.vue的模版语法，还是熟悉的html，js，css，且方便使用sass/less。


### 4.数据流不同
react采用单向数据流，所有state的修改都要通过setState方法，
在执行setState的时候，react不是立即更新state，只是把新的state存到一个队列batchUpdate，
然后再批处理，其中会经过shouldComponentUpdate来判断是否重新渲染，
如果是，react会进行state合并，生成新的state和props，重新render视图；
如果不是，react仍然会更新state，但是不会再render。
相当于于把setState看作是重新render的一次请求而不是立即更新的指令。

vue采用双向数据流，可以随意修改state，但有些限制。
vue的限制：（需要使用Vue.set(object, key, value)方法）
（1）不能检测到对象属性的添加和删除
（2）不能检测通过索引设置数组的值
（3）不能检测直接修改数组的长度 （用splice方法替代）


### 5.原理不同
react把每个组件当成一个状态机，组件内部通过state来维护组件状态的变化，
当状态改变的时候，通过虚拟dom来增量并且高效的更新真是dom。

vue通过Object.defineProperty的getter/setter来追踪数据,每个组件实例都有watcher，
当依赖项的setter被调用时，会通知watcher重新计算，致使组件更新。

### 6.使用场景不同
react的生态系统要大于vue，适合大规模多人协作的复杂项目。
vue使用在小项目上会更加灵活，简单。


### 7.redux和vuex
redux数据流的顺序是：
view层调用store.dispatch发起action
-> store接收action（action传入reducer，reducer返回一个新的state）
-> 通知store.subscribe订阅的重新渲染函数

vuex根据vue的特性改进了redux，以mutations取代reducer，只需在mutation里改变state的值，也无需订阅重新渲染函数
vuex数据流的顺序：
view层调用store.commit提交对应的请求到store中对应的mutation
-> store改变（vue检测数据变化自动渲染）







