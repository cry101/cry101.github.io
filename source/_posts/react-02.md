---
title: react的性能优化
date: 2018-06-08 15:26:19
tags: react
categories: React
---


### 1.render里减少bind函数。
bind方法尽量放到构造函数constructor里。
事件的绑定一般有三种：
<1>会导致每次render都渲染bind函数
```jsx harmony
class App extends React.Component {
	render() {
		return(
			<button onClick={this.onClick.bind(this)}>确定</button>
		)
	}
}
```
<2>会导致每次render都生成新的箭头函数
```jsx harmony
class App extends React.Component {
	render() {
		return(
			<button onClick={() => this.onClick()}>确定</button>
		)
	}
}
```
<3>只绑定一次,常用写法
```jsx harmony
class App extends React.Component {
	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
	}
	render() {
		return(
			<button onClick={this.onClick}>确定</button>
		)
	}
}
```
<4>利用箭头函数bind
```jsx harmony
class App extends React.Component {
	constructor(props) {
		super(props)
	}
	onClick = (e) => {
		
	}
	onTab = (text) => (e) => {
		//传参
	}
	render() {
		return(
			<div>
				<button onClick={this.onClick}>确定</button>
				<button onClick={this.onTab('xxx')}>取消</button>
			</div>	
		)
	}
}
```

### 2.传递对象是先定义再使用
对象是引用类型，浅层比较只会比较这两个prop是不是同一个引用。
```jsx harmony
// bad 使用这种方法，每一次渲染都会被认为是一个style这个prop发生了变化，因为每一次都会产生一个对象给style。
class App extends React.Component {
	render() {
		return(
			<button style={{color: 'red'}}>确定</button>
		)
	}
}

//better
class App extends React.Component {
	render() {
		const style = {color: 'red'}
		return(
			<button style={style}>确定</button>
		)
	}
}

```


### 3.shouldComponentUpdate
为了减少额外渲染，可以在该函数内对当前的props/state与nextProps/nextState进行比较，如果有一致的props/state则返回fasle说明不用重新渲染该组件，以减少重新渲染造成的性能浪费。
可以实现控制一些业务上不需要改变的子组件。


### 4.PureComponent
PureComponent组件创建了默认的shouldComponentUpdate行为。这个默认的shouldComponentUpdate行为会一一浅比较props和state中所有的属性，只有当其中任意一项发生改变是，才会进行重绘。


### 5.[immutable.js](https://github.com/facebook/immutable-js)
JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。
```javascript
let foo = {a: 1};
let bar = foo; 
bar.a = 2; //foo.a = 2
```
immutable.js会在每次对原对象进行添加，删除，修改使返回新的对象实例。任何对数据的修改都会导致数据指针的变化。

```javascript
// 使用 immutable.js 后
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
```

有个简易版叫做seamless-immutable，该库只支持Map,Set,List三种数据类型


### 6.列表使用key
key值保持唯一，尽量别用索引当key，会失去key值的意义。
react可以通过key更新新增或减少的项，而key值不变的不会再渲染。