---
title: 常用css3总结
date: 2017-02-17 11:15:11
tags: css
---
[W3C手册在此](http://www.w3school.com.cn/cssref/index.asp)
### 1.圆角 --- border-radius
```css
.box{
  /* 语法：border-radius: 1-4 length|% / 1-4 length|%;*/
  -moz-border-radius:3px;
  -webkit-border-radius:3px;
  border-radius:3px;

  border-radius: 2em 1em 4em / 0.5em 3em;
  /*等价于*/
  border-top-left-radius: 2em 0.5em;
  border-top-right-radius: 1em 3em;
  border-bottom-right-radius: 4em 0.5em;
  border-bottom-left-radius: 1em 3em;
}
```
### 2.阴影 --- box-shadow
```css
.box{
  -webkit-box-shadow:0 0 10px #CCC;  
  -moz-box-shadow:0 0 10px #CCC;  
  box-shadow:0 0 10px #CCC;  

  /*语法:box-shadow: h-shadow v-shadow blur spread color inset
   * h-shadow : 水平阴影位置（必需）
   * v-shadow : 垂直阴影的位置 （必需）
   * blur : 模糊距离
   * spread : 阴影的尺寸
   * color : 阴影的颜色
   * inset : 将外部阴影 (outset) 改为内部阴影
   */
}
```
### 3.动画 --- animation
```css
@keyframes mymove
{
from {top:0px;}
to {top:200px;}
}

@-moz-keyframes mymove /* Firefox */
{
from {top:0px;}
to {top:200px;}
}

@-webkit-keyframes mymove /* Safari 和 Chrome */
{
from {top:0px;}
to {top:200px;}
}

@-o-keyframes mymove /* Opera */
{
from {top:0px;}
to {top:200px;}
}
div
{
animation:mymove 5s infinite;
-webkit-animation:mymove 5s infinite; /* Safari 和 Chrome */
}
/*
*animation 属性是一个简写属性，用于设置六个动画属性：
*animation-name 规定需要绑定到选择器的 keyframe 名称
*animation-duration 规定完成动画所花费的时间，以秒或毫秒计
*animation-timing-function 规定动画的速度曲线  linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier(n,n,n,n)
*animation-delay 规定在动画开始之前的延迟
*animation-iteration-count 规定动画应该播放的次数  n/infinite(循环播放)
*animation-direction 规定是否应该轮流反向播放动画
*/

```


