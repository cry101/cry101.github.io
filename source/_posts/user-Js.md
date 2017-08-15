---
title: 用js替换jquery
date: 2017-04-18 10:56:11
tags: javascript
---

### 1.获取元素
```javascript
// jquery
$('.xxx');  //class获取  
$('#xxx');  //id获取  
$('.xxx.ccc');  //同时包含xxx和ccc  
$('.xxx,.zzz'); //多选  
$('.xxx div'); //子类  
$('.xxx p:first'); //第一个P元素  

// javascript （querySelectorAll）
document.querySelector('.xxx');  //class获取  
document.querySelector('#xxx');//id获取  
document.querySelector('.xxx.ccc');//同时包含xxx和ccc  
document.querySelector('.xxx,.ccc');//多选  
document.querySelector('.xxx div');//子类  
document.querySelector('.xxx p:first-child');//第一个P元素  
```
### 2.操作class
```javascript
// jquery
$('.xxx').addClass('class_name');
$('.xxx').removeClass('class_name'); 
$('.xxx').toggleClass('class_name'); 

// javascript
el.classList.add('class_name');
el.classList.remove('class_name');
el.classList.toggle('class_name'); 
```

### 3.是否包含某个class
```javascript
// jquery
$('.xxx').hasClass('class_name');

// javascript
el.classList.contains('class_name');
```
上面是HTML5提供的新的方法，如果你非要为了兼容所谓的IE，可以用下面的这些
```javascript
//是否包含class    
function hasClass(o, n){  
    return new RegExp('\\b'+n+'\\b').test(o.className);  
};  
//添加class    
function addClass(o, n){  
    if(!hasClass(o, n)) o.className+=' '+n;  
};  
//删除class    
function delClass(o, n){  
    if(hasClass(o, n)){  
        o.className = o.className.replace(new RegExp('(?:^|\\s)'+n+'(?=\\s|$)'), '').replace(/^\s*|\s*$/g, '');  
    };  
};  
```
### 4.插入HTML
```javascript
// jquery
$(el).before(htmlString);  
$(parent).append(el);  
$(el).after(htmlString);  

// javascript
parent.appendChild(el);  
el.insertBefore(NewDom,ele);  
ele.insertAdjacentHTML("beforeend", '<li>内容</li>');    
```
### 5.获取节点
```javascript
// jquery
$('.xxx').children();
$('.xxx').prev();
$('.xxx').next(); 
$('.xxx').parent();
$(ele).siblings();

// javascript
ele.children;
var prev = ele.previousElementSibling || ele.previousSibling;  
var next = ele.nextElementSibling || ele.nextSibling;
ele.parentNode;
//上下节点
var siblings = Array.prototype.slice.call(el.parentNode.children);  
for (var i = siblings.length; i--;) {  
    if (siblings[i] === el) {  
        siblings.splice(i, 1);  
        break;  
    };  
};  
;[].forEach.call(el.parentNode.children, function(child){  
    if(child !== el);  
});  

```

### 6.循环节点
```javascript
// jquery
$(selector).each(function(i, el){  
    //xxx  
});  

// javascript
[].forEach.call(ele,function(el,i){  
    //xxx  
});  
```
### 7.克隆节点
```javascript
// jquery
$('.xxx').clone(true);

// javascript
ele.cloneNode(true);
```

### 8.操作节点
```javascript
// jquery
var ele = $('<div></div>');
$(ele).remove();

// javascript
var ele = document.createElement('div');
parent.removeChild(ele);//父节点开始删除
```
### 9.获取、设置、删除属性
```javascript
// jquery
$(ele).attr(name,value) //设置  
$(ele).attr(name) //获取  
$(ele).removeAttr(name) //删除

// javascript
ele.setAttribute(name,value);//设置  
ele.getAttribute(name);//获取  
ele.removeAttribute(name);//删除
```
### 10.Data属性
```javascript
// jquery
$("body").data("foo", 52);  //设置  
$("body").data("foo");  //获取  
$("body").removeData("foo");  //删除 

// javascript
ele.dataset.foo = 52  //设置  
ele.dataset.foo  //获取  
  
//也可通过attribute方法来设置获取和删除  
ele.setAttribute('data-foo', 52);//设置  
ele.getAttribute('data-foo'); //获取  
ele.removeAttribute('data-foo');//删除 
```
### 11.操作内容
```javascript
// jquery
var html = $(ele).html();
$(el).empty();
$(ele).text();

// javascript
var html = ele.innerHTML;
el.innerHTML = '';
var txt = ele.textContent || ele.innerText;
```
### 12.操作CSS
```javascript
// jquery
$(ele).css('height','300px');  
$(ele).css({  
    height:300  
});
$(obj).css('marginLeft');//获取CSS

// javascript
ele.style.height = '300px';  
ele.style.cssText = 'height:200px;color:red;left:100px;'
function getStyle(obj,attr){  
    if(obj.currentStyle){  
        return obj.currentStyle[attr];  
    }else{  
        return getComputedStyle(obj,null)[attr];  
    };  
};  
```
### 13.显示隐藏
```javascript
// jquery
$(el).show();  
$(el).hide();

// javascript
el.style.display = '';  
el.style.display = 'none';
```
### 14.元素的高度（宽度同理）[height]
```javascript
// jquery
$(ele).height();

// javascript
function height(el){      
    var _height = el.clientHeight;      
    var style = el.currentStyle || getComputedStyle(el);        
    return _height - (parseInt(style.paddingTop) + parseInt(style.paddingBottom));      
}; 
```
元素的内高度（宽度同理）[height + padding]
```javascript
// jquery
$(ele).innerHeight(); 

// javascript
ele.clientHeight;
```
元素的外高度（宽度同理）[height + padding + border]
```javascript
// jquery
$(ele).outerHeight();

// javascript
ele.offsetWidth;
```
元素的外高度（宽度同理）[height + padding + border + margin]
```javascript
// jquery
$(ele).outerHeight(true);

// javascript
function outerHeight(el){    
    var style = el.currentStyle || getComputedStyle(el);    
    var height = el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);    
    return height;    
};
```
### 15.元素的位置
```javascript
// jquery
$(ele).position().left;  
$(ele).position().top;  
  
$(ele).offset().left;  
$(ele).offset().top;  

// javascript
ele.offsetLeft;  
ele.offsetTop;  
  
function getposi(obj){    
    var t = 0,l = 0;    
    while(obj){    
        t+=obj.offsetTop;    
        l+=obj.offsetLeft;    
        obj = obj.offsetParent;    
    };    
    return {top:t,left:l};    
};  
//getposi(ele).left  
//getposi(ele).top  
ele.getBoundingClientRect().top + window.pageYOffset;  
ele.getBoundingClientRect().bottom + window.pageYOffset;  
ele.getBoundingClientRect().left + window.pageYOffset;  
ele.getBoundingClientRect().right + window.pageXOffset;  
```
### 16.Document事件
```javascript
// jquery
$(document).ready(function() {  
    // ready 
});

$(window).load(function() {  
    // load  
});

$(document).click(function(){  
    //添加事件  
});

$(ele).on('click',function(){  
    //绑定事件  
});

// javascript
//ready
document.addEventListener("DOMContentLoaded", function() {  
    // Code  
},false);
//load
document.addEventListener("load", function() {  
    // Code  
},false);
//添加事件
document.onclick = function(){  
        //XXX  
};
//绑定事件
document.addEventListener("click", function() {    
        //xxx    
},false);    
  
[].forEach.call(ele,function(o){  
    o.addEventListener("click", function() {    
            //xxx    
    },false);    
});  
```
### 17.获取数据类型
```javascript
// jquery
$.type(obj);

// javascript
function type(obj){  
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();  
};
```
### 18.判断是否为数组
```javascript
// jquery
$.isArray(arr);

// javascript
function isArray (v){  
    return Object.prototype.toString.call(v) === '[object Array]';     
};  
```
### 19.去除字符串两端的空格
```javascript
// jquery
$.trim(string);

// javascript
//去除两端空格  
String.prototype.trim = function() {  
    var reExtraSpace = /^\s*(.*?)\s+$/;  
    return this.replace(reExtraSpace, "$1")  
}  
/***扩展一下***/  
//去除左边空格  
String.prototype.ltrim = function() {  
    return this.replace( /^(\s*|　*)/, "");  
}  
//去除右边空格  
String.prototype.rtrim = function() {  
    return this.replace( /(\s*|　*)$/, "");  
}  
//替换全部  
String.prototype.replaceAll = function(s1, s2) {  
    return this.replace(new RegExp(s1, "gm"), s2)  
}  
//去除所有空格，需要配合上面的替换全部  
String.prototype.trimAll = function() {  
    var reExtraSpace = /\s*(.*?)\s+/;  
    return this.replaceAll(reExtraSpace, "$1")  
}  
```
### 20.Cookie
```javascript
// jquery
$.cookie('cookie'); // 读取 cookie  
$.cookie('cookie', 'value'); // 存储 cookie  
$.cookie('cookie', 'value', { expires: 7 }); // 存储一个带7天期限的 cookie  
$.cookie('cookie', '', { expires: -1 }); // 删除 cookie  

// javascript
function setCookie(){  
    var json = {},d;  
    if(typeof arguments[0] ==’string’){  
        json[arguments[0]] = arguments[1];  
        d = arguments[2]  
    }else{  
        for(var i in arguments[0]){  
            json.i = arguments[0][i]  
            d = arguments[1];  
        };  
    };        
    var t = new Date();  
    t.setDate(t.getDate()+d);  
    for(var j in json){  
        document.cookie = j+’=’+json[j]+';expires=’+t;  
    };  
};

function getCookie(n){  
    var a = document.cookie.split(‘; ‘);  
    for(var i=0;i<a.length;i++){  
        var a2 = a[i].split(‘=’);  
        if(a2[0]==n){  
            return a2[1];  
        };  
    };  
};

function removeCookie(n){  
    setCookie(n,null,-1);  
}  
```

### 21.Ajax
```javascript
// jquery
$.ajax({  
    type: 'POST',  
    url: '/my/url',  
    data: data  
});  

// javascript
var request = new XMLHttpRequest();  
request.open('POST', '/my/url', true);  
request.send(data);   
```
