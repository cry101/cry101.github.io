---
title: 基于vue的简易数字键盘
date: 2017-02-15 11:51:31
tags:
---

## 基于vue的简易数字键盘
------
完成时间：2017.02
核心技术：zepto,Aui,vue
从小记app里提取出来的，代码有点乱
------
## 先看效果图
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/vue/image/demo.png)

核心代码：
事件没有用v-bind到组件上，因为移动端按键click会有300ms延迟，所以输入时会有延迟，用了apicloud的点击优化tap，或者用zepto的tap事件也行。
分类组件：
```javascript
//分类组件
var classifyComponent = Vue.extend({
    template: '#classifyComponent',
    props: ['item','index'],
    methods: {
        onActive: function(){
            $('#classify li').removeClass('active');
            this.$el.className = "aui-pull-left active";
        }
    }
})
//分类实例
var classify = new Vue({
      el: '#classify',
      data: {
          classify: expenditure
      },
      components:{
          'classify-component': classifyComponent
      },
      methods: {
         addClassify: function(){

         }
      }
})

```

键盘组件：
```javascript
//键盘组件
var keybordComponent = Vue.extend({
      template: '#keybordComponent',
      data : function(){
          return{
              
          }
      },
      props: ['numbers'],
      methods: {
          
      }
})
//键盘实例
var keybord = new Vue({
      el: '#keybord',
      data: {
          numbers: [7,8,9,4,5,6,1,2,3,'c',0,'.']
      },
      components:{
          'keybord-component': keybordComponent
      },
      methods: {
              onComf: function(){
                
              }
          }
})
```
按键操作：
```javascript
function onKeyUp(obj){
      var count = amount.count;
      var num = $(obj).find('span').text();
      if(num == 'c'){
          amount.count = 0; 
      }else if(num == '.'){
          amount.count = count + num;
      }else{
         if(count === 0||count === '0'){
             amount.count = num;
         }else{
             amount.count = count + num;
         }
      }
      
}
function onDelete(){
      var count = amount.count.toString();
      if(count.length == 1) {
          amount.count = 0;
      }else{
          amount.count = count.substr(0,count.length-1)
      }
}
```

[从apicloud提取出来的源码地址](https://github.com/cry101/Some-little-projects/tree/master/vue)

