---
title: css的美化
date: 2017-10-30 14:52:30
tags: css
categories: Css
index_img: https://s2.loli.net/2023/01/31/CDSapH23zZsWwE5.jpg
---
前言：能用css实现的效果就不用图片或者JS

### 1.kissy的css reset
并引用一句话：reset 的目的不是让默认样式在所有浏览器下一致，而是减少默认样式有可能带来的问题。
````css
/** 清除内外边距 **/
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
pre, /* text formatting elements 文本格式元素 */
form, fieldset, legend, button, input, textarea, /* form elements 表单元素 */
th, td /* table elements 表格元素 */ {
  margin: 0;
  padding: 0;
}

/** 设置默认字体 **/
body,
button, input, select, textarea /* for ie */ {
  font: 12px/1.5 tahoma, arial, \5b8b\4f53, sans-serif;
}
h1, h2, h3, h4, h5, h6 { font-size: 100%; }
address, cite, dfn, em, var { font-style: normal; } /* 将斜体扶正 */
code, kbd, pre, samp { font-family: courier new, courier, monospace; } /* 统一等宽字体 */
small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */

/** 重置列表元素 **/
ul, ol { list-style: none; }

/** 重置文本格式元素 **/
a { text-decoration: none; }
a:hover { text-decoration: underline; }


/** 重置表单元素 **/
legend { color: #000; } /* for ie6 */
fieldset, img { border: 0; } /* img 搭车：让链接里的 img 无边框 */
button, input, select, textarea { font-size: 100%; } /* 使得表单元素在 ie 下能继承字体大小 */
/* 注：optgroup 无法扶正 */

/** 重置表格元素 **/
table { border-collapse: collapse; border-spacing: 0; }
````

### 2.checkbox的美化
隐藏checkbox，用i标签替代
````html
<label><input type="checkbox"><i>✓</i>复选框</label><br>  
<label><input type="checkbox" checked><i>✓</i>复选框</label><br>  
<label><input type="checkbox" disabled><i>✓</i>复选框禁用</label><br>  
<label><input type="checkbox" disabled checked><i>✓</i>复选框禁用已选</label><br>  
<label><input type="radio" name="abc"><i>✓</i>单选框</label><br>  
<label><input type="radio" name="abc" checked><i>✓</i>单选框</label><br>  
<label><input type="radio" name="abc" disabled><i>✓</i>单选框禁用</label><br>  
<label><input type="radio" name="def" disabled checked><i>✓</i>单选框禁用已选</label><br>  
````
````css
/*checkbox美化*/
label {
    font-size: 12px;
    cursor: pointer;
}

label i {
    font-size: 12px;
    font-style: normal;
    display: inline-block;
    width: 12px;
    height: 12px;
    text-align: center;
    line-height: 12px;
    color: #fff;
    vertical-align: middle;
    margin: -2px 6px 1px 0;
    border: 1px solid #ccc;
}

input[type="checkbox"], input[type="radio"] {
    display: none;
}

input[type="radio"] + i {
    border-radius: 7px;
}

input[type="checkbox"]:checked + i, input[type="radio"]:checked + i {
    background: #7AD847; /*颜色自改*/
    border-color: #7AD847;
}
````

### 3.inputFile的美化
设置input=[file]的透明度为0，然后重现a标签样式
````html
<a href="javascript:;" class="file">选择文件
    <input type="file" name="" id="">
</a>
````
````css
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
````

### 4.css画三角形
[原地址](http://www.jb51.net/article/42513.htm)
````css
#triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}

#triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}

#triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}

#triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
}

#triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}

#triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent; 
}

#triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}

#triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}
````

