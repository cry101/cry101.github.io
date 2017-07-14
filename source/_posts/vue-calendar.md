---
title: 基于vue的简易日历
date: 2017-02-15 11:33:29
tags:
---

## 基于vue的简易日历
------
完成时间：2017.02
核心技术：zepto,Aui,vue
从小记app里提取出来的，代码有点乱

------
## 先看效果图
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/vue/image/demo2.png)

[点击查看webpack+vue-cli重写的](https://github.com/cry101/Some-little-projects/tree/master/vue-calendar)
核心代码：HeaderCom.vue
```html
<template>
  <div>
    <header class="aui-bar aui-bar-nav" id="header">
       <div class="aui-title">
          <span class="triangle triangle-left" v-on:click="onReduce()"><i></i></span>
          <span id="year">{{ year }}</span>年<span id="month">{{ month }}</span>月
          <span class="triangle triangle-right" v-on:click="onPlus()"><i></i></span>
      </div>
    </header>
    <TableCom :year="year" :month="month"></TableCom>
  </div>
</template>

<script>
import TableCom from 'components/TableCom'

var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth()+1;
export default {
  name: 'header',
  data () {
    return {
      year: year,
      month : month
    }
  },
  components: {
    TableCom
  },
  methods: {
      onReduce: function(){
          if(this.month == 1){
               this.year = parseInt(this.year)-1;
               this.month = 12;
          }else{
               this.month =  parseInt(this.month)-1;
          }
      },
      onPlus: function(){
          if(this.month == 12){
               this.year = parseInt(this.year)+1;
               this.month = 1;
          }else{
               this.month = parseInt(this.month)+1;
          }
      }           
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
    text-align: center;
    background-color: #fff;
    color: #000;
    width: 100%;
    z-index: 0;
}
.aui-bar-nav {
    top: 0;
    line-height: 2.25rem;
    background-color: #03a9f4;
    color: #ffffff;
}
.aui-bar {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    min-height: 2.25rem;
    font-size: 0.9rem;
    text-align: center;
    display: table;
}
.aui-bar-nav .aui-title {
    min-height: 2.25rem;
    position: absolute;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    right: 5rem;
    left: 5rem;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 2;
}
.aui-bar-nav .aui-title{
  right: 4rem;left: 4rem;
}
.triangle{
  position:absolute;
  padding: 0 .8rem;
}
.triangle-left{
    left: 0;
}
.triangle-right{
    right: 0;
}
.triangle i{
  display: inline-block;
  width: 0;
    height: 0;
}
.triangle-left i{
    border-top: 5px solid transparent;
    border-right: 10px solid #79CDA9;
    border-bottom: 5px solid transparent;
}
.triangle-right i{
    border-top: 5px solid transparent;
    border-left: 10px solid #79CDA9;
    border-bottom: 5px solid transparent;
}
</style>
```

核心代码：TableCom.vue
```html
<template>
  <table class="calendar" id="calendar">
    <tbody>
        <tr class="date-head clearfix">
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
        </tr>
        <tr class="date-body clearfix">
            <td v-for="day in days">
                <p>{{day}}</p>
            </td>
        </tr>
    </tbody>
</table> 
</template>

<script>
var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth()+1;

export default {
  name: 'TableCom',
  data () {
    return {
      days: ''
    }
  },
  props: ['year','month'],
  watch: {
    month: function() {
        var year = this.year;
        var month = this.month;
        var oDate0 = new Date( year , month , '0' );
        var oDate1 = new Date( year + '-' + month + '-' + '1' );
        var oDateDays = oDate0.getDate();//当前月的天数
        var oDateWeek = oDate1.getDay();//当前月1号的星期
        var dayArr = [];
        for(var i = 0 ; i < oDateWeek ; i++){
            dayArr.push("")
        }
        for(var j = 1 ; j <= oDateDays ; j++){
            dayArr.push(j)
        }
        this.days = dayArr
    }
  },
  mounted: function(){
      var year = this.year;
      var month = this.month;
      var oDate0 = new Date( year , month , '0' );
      var oDate1 = new Date( year + '-' + month + '-' + '1' );
      var oDateDays = oDate0.getDate();//当前月的天数
      var oDateWeek = oDate1.getDay();//当前月1号的星期
      var dayArr = [];
      for(var i = 0 ; i < oDateWeek ; i++){
          dayArr.push("")
      }
      for(var j = 1 ; j <= oDateDays ; j++){
          dayArr.push(j)
      }
      this.days = dayArr          
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar{
  width: 100%;
  text-align: center;
}
.calendar .date-head{
  height: 2rem;
  background: #79CDA9;
  color: #fff;
}
.calendar .date-head th{
  float: left;
  height: 2rem;
  width: 14.2%;
  vertical-align: middle;
  line-height: 2rem;
}
.calendar .date-body td{
  float: left;
  height: 3rem;
  line-height: .7rem;
  width: 14.2%;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
}
.calendar .date-body td>p{
  padding-top: .5rem;
}
.calendar .date-body td>span{
  font-size: .6rem;
}
.calendar .date-body td>span.income{
  color: #8BD4B4;
}
.calendar .date-body td>span.expenditure{
  color: #FB7189;
}
</style>


```


以下代码在apicloud中写的：
由于在apicloud中写的，本来应该头部日期和日历是个父子组件，可是apicloud中是win窗口open出frame窗口，所以就这样吧
```javascript
//日历实例
var calendar = new Vue({
      el: '#calendar',
      data: {
          days: ""
      },
      mounted: function(){
          
      },
      methods: {
         
      }
})
function setCalendar(year , month){
      var oDate0 = new Date( year , month , '0' );
      var oDate1 = new Date( year + '-' + month + '-' + '1' );
      console.log(oDate1)
      var oDateDays = oDate0.getDate();//当前月的天数
      var oDateWeek = oDate1.getDay();//当前月1号的星期
      console.log(oDateWeek)
      var dayArr = [];
      for(var i = 0 ; i < oDateWeek ; i++){
          dayArr.push("")
      }
      for(var j = 1 ; j <= oDateDays ; j++){
          dayArr.push(j)
      }
      console.log(dayArr)
      calendar.days = dayArr
  }
```

月份减一：
```javascript
 function onReduce(){
	    var year = document.getElementById('year').innerHTML;
	    var month = document.getElementById('month').innerHTML;
	    if(month == 1){
	         document.getElementById('year').innerHTML = parseInt(year)-1;
	         document.getElementById('month').innerHTML = 12;
	    }else{
	         document.getElementById('month').innerHTML =  parseInt(month)-1;
	    }
	    setCalendar(document.getElementById('year').innerHTML , document.getElementById('month').innerHTML)
	}
```

月份加一：
```javascript
function onPlus(){
    var year = document.getElementById('year').innerHTML;
    var month = document.getElementById('month').innerHTML;
    if(month == 12){
         document.getElementById('year').innerHTML = parseInt(year)+1;
         document.getElementById('month').innerHTML = 1;
    }else{
         document.getElementById('month').innerHTML = parseInt(month)+1;
    }
    setCalendar(document.getElementById('year').innerHTML , document.getElementById('month').innerHTML)
}
```

[从apicloud提取出来的源码地址](https://github.com/cry101/Some-little-projects/tree/master/vue)
