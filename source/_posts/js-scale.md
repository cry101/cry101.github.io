---
title: js用scale自适应缩放大屏
date: 2021-08-03 15:06:46
tags: javascript
categories: Javascript
index_img: /img/cover/10.jpeg
---

### js用scale自适应缩放大屏
```javascript
    /**
    *  vue项目
    */
    mounted(){
        //初始化自适应  ----在刚显示的时候就开始适配一次
        handleScreenAuto();
        //绑定自适应函数   ---防止浏览器栏变化后不再适配
        window.onresize = () => handleScreenAuto();
    },
    deleted(){
        window.onresize = null;
    },
    methods: {
        //数据大屏自适应函数
        const handleScreenAuto = (): void => {
            const designDraftWidth = 1920;//设计稿的宽度
            const designDraftHeight = 960;//设计稿的高度
            //根据屏幕的变化适配的比例
            const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight ?
                (document.documentElement.clientWidth / designDraftWidth) :
                (document.documentElement.clientHeight / designDraftHeight);
            //缩放比例
            (document.querySelector('#screen') as any).style.transform = `scale(${scale}) translate(-50%)`;
        }
    }
```

```html
 <template>
     <div className="screen-wrapper">
        <div className="screen" id="screen">

        </div>
     </div>
 </template>
```

```css
    /*
      CSS部分  --除了设计稿的宽高是根据您自己的设计稿决定以外，其他复制粘贴就完事
    */  
   <style>
         .screen-root {
            height: 100%;
            width: 100%;
            .screen {
                display: inline-block;
                width: 1920px;  //设计稿的宽度
                height: 960px;  //设计稿的高度
                transform-origin: 0 0;
                position: absolute;
                left: 50%;
            }
        }
   <style>

```