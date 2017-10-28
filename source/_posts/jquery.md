---
title: jQuery源码浅析
date: 2017-10-28 08:22:47
tags: [jQuery,javascript]
---

### 1.jQuery闭包结构

```javascript
(function(window, undefined) {
   // jQuery 代码
})(window);
```
jQuery 具体的实现，都被包含在了一个立即执行函数构造的闭包里面，为了不污染全局作用域，只在后面暴露 $ 和 jQuery 这 2 个变量给外界，尽量的避开变量冲突。

还有另一种写法：
```javascript
(function(window) {
   // jQuery 代码
})(window, undefined);
```
不足之处在于早期的环境中（ie8）,undefined的值可以被变量覆盖。
而且第一种写法有一个针对压缩优化细节：
```javascript
// 压缩策略
// w -> windwow , u -> undefined
(function(w, u) {
 
})(window);
```

### 2.jQuery无new构造
```javascript
// 无 new 构造
$('#test').text('Test');
 
// 当然也可以使用 new,两种写法相同
var test = new $('#test');
test.text('Test');
```
jQuery内部实现的方式：
```javascript
(function(window, undefined) {
    var
    // ...
    jQuery = function(selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // 看这里，实例化方法 jQuery() 实际上是调用了其拓展的原型方法 jQuery.fn.init
        return new jQuery.fn.init(selector, context, rootjQuery);
    },
 
    // jQuery.prototype 即是 jQuery 的原型，挂载在上面的方法，即可让所有生成的 jQuery 对象使用
    jQuery.fn = jQuery.prototype = {
        // 实例化化方法，这个方法可以称作 jQuery 对象构造器
        init: function(selector, context, rootjQuery) {
            // ...
        }
    }
    // 这一句很关键，也很绕
    // jQuery 没有使用 new 运算符将 jQuery 实例化，而是直接调用其函数
    // 要实现这样,那么 jQuery 就要看成一个类，且返回一个正确的实例
    // 且实例还要能正确访问 jQuery 类原型上的属性与方法
    // jQuery 的方式是通过原型传递解决问题，把 jQuery 的原型传递给jQuery.prototype.init.prototype
    // 所以通过这个方法生成的实例 this 所指向的仍然是 jQuery.fn，所以能正确访问 jQuery 类原型上的属性与方法
    jQuery.fn.init.prototype = jQuery.fn;
 
})(window);
```
实例化方法存在的关系链：
(1)jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype ;
(2)new jQuery.fn.init() 相当于 new jQuery() ;
(3)jQuery() 返回的是 new jQuery.fn.init()，而 var obj = new jQuery()，所以这 2 者是相当的，所以我们可以无 new 实例化 jQuery 对象。

### 3.jQuery方法的重载
当我们实例化一个jquery对象时，他的内部实现有着9种不同的方法重载场景。
```javascript
// 接受一个字符串，其中包含了用于匹配元素集合的 CSS 选择器
jQuery([selector,[context]])
// 传入单个 DOM
jQuery(element)
// 传入 DOM 数组
jQuery(elementArray)
// 传入 JS 对象
jQuery(object)
// 传入 jQuery 对象
jQuery(jQuery object)
// 传入原始 HTML 的字符串来创建 DOM 元素
jQuery(html,[ownerDocument])
jQuery(html,[attributes])
// 传入空参数
jQuery()
// 绑定一个在 DOM 文档载入完成后执行的函数
jQuery(callback)
```

### 4.jQuery.fn.extend 与 jQuery.extend
不同之处在于：
<1>
jQuery.extend(object) 为扩展 jQuery 类本身，为类添加新的静态方法；

jQuery.fn.extend(object) 给 jQuery 对象添加实例方法，也就是通过这个 extend 添加的新方法，实例化的 jQuery 对象都能使用，因为它是挂载在 jQuery.fn 上的方法（上文有提到，jQuery.fn = jQuery.prototype ）。 

<2>
使用 jQuery.extend() 拓展的静态方法，我们可以直接使用 $.xxx 进行调用（xxx是拓展的方法名），

而使用 jQuery.fn.extend() 拓展的实例方法，需要使用 $().xxx 调用。

<3>
在 jQuery.extend() 中，this 的指向是 jQuery 对象(或者说是 jQuery 类)，所以这里扩展在 jQuery 上；

在 jQuery.fn.extend() 中，this 的指向是 fn 对象，前面有提到 jQuery.fn = jQuery.prototype ，也就是这里增加的是原型方法，也就是对象方法。


### 5.jQuery 的链式调用及回溯
```javascript
// 通过 end() 方法终止在当前链的最新过滤操作，返回上一个对象集合
$('div').eq(0).show().end().eq(1).hide();

```
其内部实现其实是依靠添加了 prevObject 这个属性,源码实现：
```javascript
jQuery.fn = jQuery.prototype = {
    // 将一个 DOM 元素集合加入到 jQuery 栈
    // 此方法在 jQuery 的 DOM 操作中被频繁的使用, 如在 parent(), find(), filter() 中
    // pushStack() 方法通过改变一个 jQuery 对象的 prevObject 属性来跟踪链式调用中前一个方法返回的 DOM 结果集合
    // 当我们在链式调用 end() 方法后, 内部就返回当前 jQuery 对象的 prevObject 属性
    pushStack: function(elems) {
        // 构建一个新的jQuery对象，无参的 this.constructor()，只是返回引用this
        // jQuery.merge 把 elems 节点合并到新的 jQuery 对象
        // this.constructor 就是 jQuery 的构造函数 jQuery.fn.init，所以 this.constructor() 返回一个 jQuery 对象
        // 由于 jQuery.merge 函数返回的对象是第二个函数附加到第一个上面，所以 ret 也是一个 jQuery 对象，这里可以解释为什么 pushStack 出入的 DOM 对象也可以用 CSS 方法进行操作
        var ret = jQuery.merge(this.constructor(), elems);
 
        // 给返回的新 jQuery 对象添加属性 prevObject
        // 所以也就是为什么通过 prevObject 能取到上一个合集的引用了
        ret.prevObject = this;
        ret.context = this.context;
 
        // Return the newly-formed element set
        return ret;
    },
    // 回溯链式调用的上一个对象
    end: function() {
        // 回溯的关键是返回 prevObject 属性
        // 而 prevObject 属性保存了上一步操作的 jQuery 对象集合
        return this.prevObject || this.constructor(null);
    },
    // 取当前 jQuery 对象的第 i 个
    eq: function(i) {
        // jQuery 对象集合的长度
        var len = this.length,
            j = +i + (i < 0 ? len : 0);
 
        // 利用 pushStack 返回
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    }, 
}

```
总的来说，

1）end() 方法返回 prevObject 属性，这个属性记录了上一步操作的 jQuery 对象合集；

2）而 prevObject 属性由 pushStack() 方法生成，该方法将一个 DOM 元素集合加入到 jQuery 内部管理的一个栈中，通过改变 jQuery 对象的 prevObject 属性来跟踪链式调用中前一个方法返回的 DOM 结果集合

3）当我们在链式调用 end() 方法后，内部就返回当前 jQuery 对象的 prevObject 属性，完成回溯。


### 6.jQuery 变量冲突处理
当需要处理冲突的时候，调用静态方法 noConflict()，让出变量的控制权，源码如下：
```javascript
(function(window, undefined) {
    var
        // Map over jQuery in case of overwrite
        // 设置别名，通过两个私有变量映射了 window 环境下的 jQuery 和 $ 两个对象，以防止变量被强行覆盖
        _jQuery = window.jQuery,
        _$ = window.$;
 
    jQuery.extend({
        // noConflict() 方法让出变量 $ 的 jQuery 控制权，这样其他脚本就可以使用它了
        // 通过全名替代简写的方式来使用 jQuery
        // deep -- 布尔值，指示是否允许彻底将 jQuery 变量还原(移交 $ 引用的同时是否移交 jQuery 对象本身)
        noConflict: function(deep) {
            // 判断全局 $ 变量是否等于 jQuery 变量
            // 如果等于，则重新还原全局变量 $ 为 jQuery 运行之前的变量（存储在内部变量 _$ 中）
            if (window.$ === jQuery) {
                // 此时 jQuery 别名 $ 失效
                window.$ = _$;
            }
            // 当开启深度冲突处理并且全局变量 jQuery 等于内部 jQuery，则把全局 jQuery 还原成之前的状况
            if (deep && window.jQuery === jQuery) {
                // 如果 deep 为 true，此时 jQuery 失效
                window.jQuery = _jQuery;
            }
 
            // 这里返回的是 jQuery 库内部的 jQuery 构造函数（new jQuery.fn.init()）
            // 像使用 $ 一样尽情使用它吧
            return jQuery;
        }
    })
}(window)
```




