---
title: 移动端适配方案
date: 2018-08-28 10:22:32
tags: css
---


### 1.rem（网易方案）
按设计稿640px宽度的话，为了计算方便，取一个100px的font-size为参照，那么body元素的宽度就可以设置为width: 6.4rem，，于是html的font-size=deviceWidth / 6.4。
```javascript
(function rem() {
  var fz = document.documentElement.clientWidth / 6.4;
  //最好限制下最大值
  document.documentElement.style.fontSize = fz <= 100 ? fz + 'px' : '100px';
  window.onresize = function() {
	  rem();
  };
})();
```
然后布局是按设计稿的数值除以100，得到对应的rem值。
同时，font-size不再使用rem,可以结合媒体查询
```css
@media screen and (max-width:321px){
    .m-navlist{font-size:15px}
}

@media screen and (min-width:321px) and (max-width:400px){
    .m-navlist{font-size:16px}
}

@media screen and (min-width:400px){
    .m-navlist{font-size:18px}
}
```


### 2.淘宝方案
(1)动态设置viewport的scale
device-width的计算公式为：设备的物理分辨率/(devicePixelRatio * scale)，
在scale为1的情况下，device-width = 设备的物理分辨率/devicePixelRatio 。
```javascript
var scale = 1 / devicePixelRatio;
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
```
(2)动态计算html的font-size
```javascript
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
```
(3)布局的时候，各元素的css尺寸=设计稿标注尺寸/设计稿横向分辨率/10
(4)font-size可能需要额外的媒介查询，并且font-size不使用rem，这一点跟网易是一样的。


### 3.vw vh
1vw = 1/100th viewport width
1vh = 1/100th viewport heght
用viewport width的百分比来设置element width
```sass
//640px作为设计稿基准
$vm_base: 640; 
@function vm($px) {
    @return ($px / 640) * 100vw;
}

//通过代码，假如设计稿中元素的宽度是 40px ，那么就可以在样式中写
.test{
    width:vm(40)
}
```


### 4.vw结合rem
计算1px = 100vw/750px = 0.13vw,取1rem = 100px = 13.33vw。
布局时按设计稿的数值除以100，得到对应的rem值。
```css
html{font-size:13.33333333vw}
```


