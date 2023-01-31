---
title: js星级评分的实现
date: 2017-07-26 10:17:05
tags: javascript
categories: Javascript
index_img: https://s2.loli.net/2023/01/31/vFELgeNfIHKhD1o.webp
---

### 1.第一种写法
```html
<style>
    body, ul , li {margin: 0;padding: 0}
    li{list-style: none;}
    .rating {width: 200px;height: 34px;margin: 100px auto;}
    .rating-item{
        float: left;
        width: 34px;
        height: 34px;
        background: url(http://i.niupic.com/images/2017/05/31/iVPGGC.png) no-repeat;
        cursor: pointer;
    }
</style>
<!--index.html-->
<ul class="rating" id="rating">
    <li class="rating-item" title="很不好"></li>
    <li class="rating-item" title="不好"></li>
    <li class="rating-item" title="一般"></li>
    <li class="rating-item" title="好"></li>
    <li class="rating-item" title="很好"></li>
</ul>
```

```javascript
//index.js
var num=2,
    $rating = $('#rating'),
    $item = $rating.find('.rating-item');

//点亮
var lightOn=function(num){
   $item.each(function(index){
      if(index<num){
         $(this).css('background-position','0 -40px');
      }else{
         $(this).css('background-position','0 0');
      }
   });
}

//初始化
lightOn(num);

//事件绑定
$item.on('mouseover',function(){
   lightOn($(this).index()+1)
}).on('click',function(){
    num = $(this).index()+1
});
$rating.on('mouseout',function(){
    lightOn(num);
})

```
（1）改进代码：
* 1.闭包防止全局变量污染
* 2.事件委托防止多次绑定事件
* 3.代码复用
```javascript
//index.js
//闭包
var rating = (function(){
    //点亮，这个函数是通用的
    var lightOn=function($item,num){
       $item.each(function(index){
          if(index<num){
             $(this).css('background-position','0 -40px');
          }else{
             $(this).css('background-position','0 0');
          }
       });
    }
    //代码复用
    var init = function(el,num){
        var $rating = $(el),
            $item = $rating.find('.rating-item');

        //初始化
        lightOn($item,num);

        //事件委托，将子元素事件委托给父元素
        $rating.on('mouseover','.rating-item',function(){
           lightOn($item,$(this).index()+1) 
        }).on('click','.rating-item',function(){
            num = $(this).index()+1
        }).on('mouseout',function(){
            lightOn($item,num);
        })
    }
    
    //jQuery插件
    $.fn.extend({
        rating: function(num){
            return this.each(function(){
                init(this,num);    
            })
        }
    });

    return {
        init: init
    }

    
})()

rating.init('#rating',2);
//raring.init('#rating2',3);//第二个评分
$('#rating2').rating(4);//jquery插件调用

```
（2）设计模式
封装一个函数是复用代码，使用一个设计模式是复用他人的经验
* <1>创建型模式，就是对创建对象进行封装。如单例，抽象工厂，建造者，工厂，原型。
* <2>结构型模式，主要解决类之间的耦合关系。如适配器，桥接，装饰，组合，外观，享元，代理。
* <3>行为型模式，是对象之间的常用交流模式。如模板方法，命令，迭代器，观察者，中介者，备忘录，解释器，状态，策略，责任链，访问者。

（3）模板方法模式
需求：点亮半颗星星
再次扩展
```javascript
var rating = (function(){
  //点亮整颗
  var LightEntire = function(el,options){
    this.$el = $(el);
    this.$item = this.$el.find('.rating-item');
    this.opts = options;
  };
  LightEntire.prototype.init = function(){
    this.lightOn(this.opts.num);
    if(!this.opts.readOnly){
        this.bindEvent();
    }
  };
  LightEntire.prototype.lightOn = function(num){
    num = parseInt(num);
    this.$item.each(function(index){
        if(index<num){
           $(this).css('background-position','0 -40px');
        }else{
           $(this).css('background-position','0 0');
        }
     });
  };
  LightEntire.prototype.bindEvent = function(){
    var self = this,
        itemLength = self.$item.length;
    self.$el.on('mouseover','.rating-item',function(){
        var num = $(this).index()+self.add;
        self.lightOn(num);

        //短路符，先判断传入的是否函数。call改变this指向
        (typeof self.opts.select === 'function') && self.opts.select.call(this ,num, itemLength)
        //触发select事件
        self.$el.trigger('select',[num,itemLength])
    }).on('click','.rating-item',function(){
       self.opts.num = $(this).index()+self.add;

       (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this ,self.opts.num, itemLength)
    
         self.$el.trigger('chosen',[self.opts.num,itemLength])
    }).on('mouseout',function(){
        self.lightOn(self.opts.num);
    })
  }

  //点亮半颗
  var LightHalf = function(el,options){
    this.$el = $(el);
    this.$item = this.$el.find('.rating-item');
    this.opts = options;
    this.add = 1;
  };
  LightHalf.prototype.init = function(){
    this.lightOn(this.opts.num);
    if(!this.opts.readOnly){
        this.bindEvent();
    }
  };
  LightHalf.prototype.lightOn = function(num){
    var count = parseInt(num),
        isHalf = count!==num;

    this.$item.each(function(index){
        if(index<num){
           $(this).css('background-position','0 -40px');
        }else{
           $(this).css('background-position','0 0');
        }
     });

    if(isHalf){
            this.$item.eq(count).css('background-position','0 -80px')
    }
  };
  LightHalf.prototype.bindEvent = function(){
    var self = this,
        itemLength = self.$item.length;

    self.$el.on('mousemove','.rating-item',function(e){
        var $this = $(this),
            num = 0;

        if(e.pageX-$this.offset().left < $this.width()/2){//半颗
            self.add = 0.5;
        }else{//整颗
            self.add = 1;
        }
        num = $this.index() + self.add;

        self.lightOn(num);

        //短路符，先判断传入的是否函数。call改变this指向
        (typeof self.opts.select === 'function') && self.opts.select.call(this ,num, itemLength)
        //触发select事件
        self.$el.trigger('select',[num,itemLength])

    }).on('click','.rating-item',function(){
       self.opts.num = $(this).index() + self.add;

       (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this ,self.opts.num, itemLength)
    
       self.$el.trigger('chosen',[self.opts.num,itemLength])
    }).on('mouseout',function(){
        self.lightOn(self.opts.num);
    })
  }

  //默认参数
  var defaults = {
    mode: 'LightEntire',//半颗 LightHalf
    num: 0,
    readOnly: false,
    select: function(){},
    chosen: function(){}
  };
  //做个映射
  var mode = {
    'LightEntire' : LightEntire,
    'LightHalf' : LightHalf
  }

  //初始化
  var init = function(el,options){
    options = $.extend({},defaults,options);
    if(!mode[options.mode]){//容错
        options.mode = 'LightEntire';
    }
    //new LightEntire(el,options).init();
    //new LightHalf(el,options).init();
    new mode[options.mode](el,options).init();
  };

  return {
    init: init
  }
})();

rating.init('#rating',{
    mode: 'LightHalf',
  num : 2.5,
  // select : function(num, total) {
  //    console.log(this)
  //    console.log(num + '/' + total)
  //  }
})
$('#rating').on('select',function(e,num,total){
    console.log(num + '/' +total)
}).on('chosen',function(e,num,total){
    console.log(num + '/' +total)
})
```
抽象出父类,实现继承
完善初始化,增加选完后解绑事件
完善jQuery插件
```javascript
var rating = (function(){
    //原型链继承 不需要构造函数里的东西，如果构造函数里东西多，会影响性能
    //LightEntire.prototype = new Light();
    //继承 改造
    var extend = function(subClass,superClass){
        var F = function(){};//构造函数是空的
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.construtor = subClass;
    }


  //点亮 父类
  var Light = function(el,options){
    this.$el = $(el);
    this.$item = this.$el.find('.rating-item');
    this.opts = options;
    this.add = 1;
    this.selectEvent = 'mouseover';
  };
  Light.prototype.init = function(){
        this.lightOn(this.opts.num);
        if(!this.opts.readOnly){
            this.bindEvent();
        }
  };
  Light.prototype.lightOn = function(num){
    num = parseInt(num);
    this.$item.each(function(index){
        if(index<num){
           $(this).css('background-position','0 -40px');
        }else{
           $(this).css('background-position','0 0');
        }
     });
  };
  Light.prototype.bindEvent = function(){
    var self = this,
        itemLength = self.$item.length;
    //事件处理
    self.$el.on(this.selectEvent,'.rating-item',function(e){
        var $this = $(this),
            num = 0;

        //不同的方法需要子类里重写
        self.select(e,$this);

        num = $(this).index()+self.add;
        self.lightOn(num);

        //短路符，先判断传入的是否函数。call改变this指向
        (typeof self.opts.select === 'function') && self.opts.select.call(this ,num, itemLength)
        //触发select事件
        self.$el.trigger('select',[num,itemLength])
    }).on('click','.rating-item',function(){
       self.opts.num = $(this).index()+self.add;

       (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this ,self.opts.num, itemLength)
    
       self.$el.trigger('chosen',[self.opts.num,itemLength])
    }).on('mouseout',function(){
       self.lightOn(self.opts.num);
    })
  };
  Light.prototype.select = function(){
    throw new Error('子类必须重写此方法');
  };
  Light.prototype.unbindEvent = function(){
    this.$el.off();
  }

  //点亮整颗
  var LightEntire = function(el,options){
    Light.call(this,el,options)
    this.selectEvent = 'mouseover';
  };
  extend(LightEntire,Light);//继承原型里的方法
  LightEntire.prototype.lightOn = function(num){
    Light.prototype.lightOn.call(this,num)
  };
  LightEntire.prototype.select = function(){
    self.add = 1
  }


  //点亮半颗
  var LightHalf = function(el,options){
    Light.call(this,el,options);
    this.selectEvent = 'mousemove';
  };
  extend(LightHalf,Light);//继承原型里的方法
  LightHalf.prototype.lightOn = function(num){
    var count = parseInt(num),
        isHalf = count!==num;

    Light.prototype.lightOn.call(this,count)

    if(isHalf){
       this.$item.eq(count).css('background-position','0 -80px')
    }
  };
  LightHalf.prototype.select = function(e,$this){
    if(e.pageX-$this.offset().left < $this.width()/2){//半颗
        this.add = 0.5;
    }else{//整颗
        this.add = 1;
    }
  };


  //默认参数
  var defaults = {
    mode: 'LightEntire',//半颗 LightHalf
    num: 0,
    readOnly: false,
    select: function(){},
    chosen: function(){}
  };
  //做个映射
  var mode = {
    'LightEntire' : LightEntire,
    'LightHalf' : LightHalf
  }

  //初始化
  var init = function(el,option){
    var $el = $(el),
        rating = $el.data('rating'),
        options = $.extend({},defaults,typeof option === 'object' && option);
    if(!mode[options.mode]){//容错
        options.mode = 'LightEntire';
    }
    //new LightEntire(el,options).init();
    //new LightHalf(el,options).init();
    //防止重复调用时重复实例化（单例模式）
    if(!rating){
        $el.data('rating',(rating = new mode[options.mode](el,options)));
        rating.init();
    }
    //如option是字符串，执行以字符串相应的方法
    if(typeof option === 'string') rating[option]()
    
  };

    //jQuery插件
    $.fn.extend({
        rating: function(option){
            return this.each(function(){
                init(this,option);
            })
        }
    });
    

  return {
    init: init
  }
})();

rating.init('#rating',{
  mode: 'LightHalf',
  num : 2.5,
  // select : function(num, total) {
  //    console.log(this)
  //    console.log(num + '/' + total)
  //  }
  chosen: function(){
    rating.init('#rating','unbindEvent')
  }
})

$('#rating').on('select',function(e,num,total){
    console.log(num + '/' +total)
}).on('chosen',function(e,num,total){
    console.log(num + '/' +total)
})

$('#rating2').rating({
  mode: 'LightEntire',
  num : 4,
})

$('#rating2').on('chosen',function(){
  $(this).rating('unbindEvent')
})
```
[最终源码](https://github.com/cry101/Some-little-projects/blob/master/js-star/js-star1.html)

### 2.第二种写法
通过控制宽度来点亮星星，相比第一种扩展了星星个数可控
style:
```css
body,ul,li{
    padding: 0;
    margin: 0;
}
li{
    list-style: none;
}
.rating{
    position: relative;
    width: 165px;
    height: 33px;
    background: url(http://i.niupic.com/images/2017/05/31/iVPGGC.png) repeat-x;
    margin: 100px auto;
}
.rating-display{
    width: 0;
    height: 33px;
    background: url(http://i.niupic.com/images/2017/05/31/iVPGGC.png) repeat-x 0 -40px;
}
.rating-mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}
.rating-item{
    float: left;
    width: 33px;
    height: 33px;
    cursor: pointer;
}
```
html动态生成
```html
<div id="rating" class="rating">
    <!-- <div class="rating-display"></div>
    <ul class="rating-mask">
        <li class="rating-item"></li>
        <li class="rating-item"></li>
        <li class="rating-item"></li>
        <li class="rating-item"></li>
        <li class="rating-item"></li>
    </ul> -->
</div>
```
javascript
```javascript
var rating = (function(){
    //评分
    var Rating = function(el,options){
        this.$el = $(el);
        this.opts = $.extend({},Rating.DEFAULTS, options);

        //半颗星星需求
        this.opts.total *= 2;
        this.opts.num *= 2;

        this.itemWidth = 33/2;//星星默认宽度
        this.displayWidth = this.opts.num*this.itemWidth;//展示层默认宽度
    };
    Rating.DEFAULTS = {
        total : 5,
        num : 2,
        readOnly : false,
        select : function(){},
        chosen : function(){} 
    };
    Rating.prototype.init = function(){
        this.buildHTML();
        this.setCSS();
        //if(!this.opts.readOnly){
            this.bindEvent();
        //}
    };
    Rating.prototype.buildHTML = function(){//创建html
        var html = '';
        html += '<div class="rating-display"></div><ul class="rating-mask">';
        for(var i = 0;i<this.opts.total;i++){
            html += '<li class="rating-item"></li>'
        }
        html +='</ul>';

        this.$el.html(html);
    };
    Rating.prototype.setCSS = function(){//设置CSS
        this.$el.width(this.opts.total*this.itemWidth);
        this.$display = this.$el.find('.rating-display');
        this.$display.width(this.displayWidth);
        this.$el.find('.rating-item').width(this.itemWidth);
    };
    Rating.prototype.bindEvent = function(){//绑定事件
        var self = this;
        self.$el.on('mouseover','.rating-item',function(){
            var count = $(this).index() + 1;

            self.$display.width(count*self.itemWidth);

            (typeof self.opts.select === 'function') && self.opts.select.call(this,count,self.opts.total);
            self.$el.trigger('select',[count,self.opts.total]);
        }).on('click','.rating-item',function(){
            var count = $(this).index() + 1;

            self.displayWidth = count*self.itemWidth;
            (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this,count,self.opts.total);
            self.$el.trigger('chosen',[count,self.opts.total]);
        }).on('mouseout',function(){
            self.$display.width(self.displayWidth);
        });
    };
    Rating.prototype.unbindEvent = function(){//解绑事件
        this.$el.off();
    };

    var init = function(el,option){
        var $el = $(el),
            rating = $el.data('rating');

        if(!rating){
            $el.data('rating',
                (rating = new Rating(el,typeof option === 'object' &&option))
            );
            rating.init();
        }
        
        if(typeof option === 'string')rating[option]();
    };

    //jQuery插件
    $.fn.extend({
        rating: function(option){
            return this.each(function(){
                init(this,option)
            })
        }
    });
        

    return {
        init: init
    }
})()

$('#rating').rating({
    total: 7,
    num: 4,
    chosen: function(count,total){
        rating.init('#rating','unbindEvent')
    }
})

// rating.init('#rating',{
//  total : 6,
//  num: 3,
//  // select: function(count,total){
//  //  console.log(this);
//  //  console.log(count + '/' + total);
//  // }
//  chosen: function(count,total){
//      rating.init('#rating','unbindEvent')
//  }
// });
```
策略模式重构代码
策略模式：定义一系列算法，一个个封装起来，并且可以相互替换
只需评分前增加策略类
```javascript
    //策略
    var strategies = {
        entire: function(){
            return 1;
        },
        half: function(){
            return 2;
        },
        quarter: function(){
            return 4;
        }
    }

    //评分
    var Rating = function(el,options){
        this.$el = $(el);
        this.opts = $.extend({},Rating.DEFAULTS, options);
        
        if(!strategies[this.opts.mode]){//容错判断
            this.opts.mode = 'entire';
        }
        this.ratio = strategies[this.opts.mode]();
        this.opts.total *= this.ratio;
        this.opts.num *= this.ratio;

        this.itemWidth = 33/this.ratio;//星星默认宽度
        this.displayWidth = this.opts.num*this.itemWidth;//展示层默认宽度
    };
    Rating.DEFAULTS = {
        mode: 'entire',
        total : 5,
        num : 2,
        readOnly : false,
        select : function(){},
        chosen : function(){} 
    };

```
[源码](https://github.com/cry101/Some-little-projects/blob/master/js-star/js-star2.html)