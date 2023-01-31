---
title: sass和less
date: 2018-09-14 11:22:30
tags: [css,sass,less]
categories: Css
index_img: https://s2.loli.net/2023/01/31/CDSapH23zZsWwE5.jpg
---


### 1.共同点
sass和less都是一种动态样式语言，他们能做到一些css做不到的事，比如：
（1）Mixins 混合
主要意思是将一个定义好的class A引入到另一个class B中，从而简单实现class B继承了class A的所有属性。
```less
@import '~antd/lib/style/themes/default.less';
```
（2）Parametric 参数混合
带参数混合，像函数一样在class A中定义一个参数的默认值、或者参数属性集合，还可以是@arguments蛮量，然后将定义好的class A引入class B中

（3）Nested Rules 嵌套规则
```less
.tableList {
  .tableListOperator {
    margin-bottom: 16px;
    button {
      margin-right: 8px;
    }
  }
}
```

（4）Operations 运算
在CSS中使用加、减、乘、除进行数学运算，主要运用于属性值和颜色的运算，可以轻松实现属性值之间的复杂关系。

（5）Color function 颜色功能
颜色功能，颜色的函数运算，颜色会先被转化成HSL色彩空间，然后在通道级别操作。

（6）Namespaces 命名空间
将一些变量或者混合模块打包封装，更好的组织CSS和属性集的重复使用；

（7）Scope 作用域
先从本地查找变量或者混合模块，如果没有找到的话就会去父级作用域中查找，直到找到为止，这一点和其他程序语言的作域非常的相似；著作权归作者所有。

（8）Javascript evaluation js表达式
在Less或sass文件中可以使用js的表达式,用来赋值。


### 2.不同点
（1）编译环境不一样
Sass的安装需要Ruby环境，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件

（2）变量符不一样
Less是@，而Scss是$，而且变量的作用域也不一样。
```less
//Less-作用域
@color: #00c; /* 蓝色 */
#header {
  @color: #c00; /* red */
  border: 1px solid @color; /* 红色边框 */
}

#footer {
  border: 1px solid @color; /* 蓝色边框 */
}

//Less-作用域编译后
#header{border:1px solid #cc0000;}
#footer{border:1px solid #0000cc;}
```
```scss
//scss-作用域
$color: #00c; /* 蓝色 */

#header {
  $color: #c00; /* red */
  border: 1px solid $color; /* 红色边框 */
}

#footer {
  border: 1px solid $color; /* 蓝色边框 */
}

//Sass-作用域编译后

#header{border:1px solid #c00}
#footer{border:1px solid #c00}
```

（3）输出设置
Less没有输出设置。
Sass提供4中输出选项：
	nested 嵌套缩进的css代码，
	compact 展开的多行css代码，
	compressed 简洁格式的css代码，
	expanded 压缩后的css代码
	
（4）Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持。
```scss
@if lightness($color) > 30% {

} @else {

}

@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

（5）引用外部CSS文件
scss引用的外部文件命名必须以_开头, 文件名如果以下划线_开头的话，Sass会认为该文件是一个引用文件，不会将其编译为css文件。
如下例所示:其中_test1.scss、_test2.scss、_test3.scss文件分别设置的h1 h2 h3。

```scss
// 源代码：
@import "_test1.scss";
@import "_test2.scss";
@import "_test3.scss";

// 编译后：
h1 {
  font-size: 17px;
}
 
h2 {
  font-size: 17px;
}
 
h3 {
  font-size: 17px;
}
 
```

（6）Sass和Less的工具库不同
Sass有工具库Compass, 简单说，Sass和Compass的关系有点像Javascript和jQuery的关系,Compass是Sass的工具库。在它的基础上，封装了一系列有用的模块和模板，补充强化了Sass的功能。

Less有UI组件库Bootstrap,Bootstrap是web前端开发中一个比较有名的前端UI组件库，Bootstrap的样式文件部分源码就是采用Less语法编写。