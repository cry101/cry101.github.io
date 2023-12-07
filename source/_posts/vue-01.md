---
title: vue2.0中的eventBus
date: 2018-01-06 10:40:58
tags: [vue,javascript]
categories: Vue
index_img: /img/cover/3.webp
---
### 1.定义
主要是在要相互通信的兄弟组件之中，都引入一个新的vue实例，然后通过分别调用这个实例的事件触发和监听来实现通信和参数传递。

### 2.用法
bus.js
```javascript
import Vue from 'vue';  
export default new Vue();  
```

兄弟组件 click.vue
```html
<template>
	<div class="click" @click.stop.prevent="doClick($event)"></div>  
</template>

<script>
	import Bus from 'common/js/bus.js';  
	export default{
		data(){
			return {}
		},
		methods: {  
           doClick(event) {  
           		Bus.$emit('getTarget', event.target);   
           }  
        }  
	}
</script>
```

兄弟组件 show.vue
```html
<script >
	import Bus from 'common/js/bus.js';
	export default{
		data(){
			return {}
		},
		created() {  
			Bus.$on('getTarget', target => {  
				console.log(target);  
			});  
		}
	}
</script>
```

### 3.问题
（1）$emit时，必须已经$on，否则无法监听到事件。
（2）$on在组件销毁后不会自动解除绑定，若同一组件多次生成则会多次绑定事件，导致一次$emit，多次响应，需额外处理。
（3）数据非"长效"数据，无法保存，只在$emit后生效。


### 4.特殊的eventBus
bus.js
```javascript
const bus = new Vue({
	data(){
		return {
			val: ''
		}
	},
	created(){
		this.$on('updateData',val=>{
			this.val = val
		})
	}
})
```
数据发出组件 click.vue
```javascript
import bus from 'xxx/bus'
//触发在bus中已经绑定好的事件
bus.$emit('updateData', 123)
```
数据接收组件
```javascript
{{val}}

import bus from 'xxx/bus'
//使用computed接收数据
computed(){
	val(){
		return bus.val
	}
}
```

解决问题：
(1)数据在bus上存在，所以可以不需要组件同时存在。
(2)绑定监听都在bus上，不会重复绑定。
(3)数据可以长效存在。

这种eventBus可以达到简化版vuex的效果，通过$emit触发而不直接修改组件的值，是遵循vuex的架构。
组件不允许直接修改属于store实例的state，而应执行action来分发（dispatch）事件通知store去改变。
