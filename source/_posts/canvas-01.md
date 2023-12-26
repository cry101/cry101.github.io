---
title: canvas绘制文字对齐方式
date: 2022-12-26 11:11:51
tags: [js, canvas]
index_img: /img/cover/audb8-vwdgg.jpg
---

### 1.canvas文本左对齐
就是x轴设置为0即可。
```javascript
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var str = '这是需要绘制的文本内容'

ctx.fillText(str, 0, y)

```

### 2.canvas文本居中
- 1.首先文本有个居中属性：ctx.textAlign = ‘center’
- 2.其次设置x轴的位置为画布宽度的一半即可
```javascript
var canvas = document.getElementById("myCanvas");
canvas.width = 500
var ctx = c.getContext("2d");
var str = '这是需要绘制的文本内容'
 
ctx.font = 'bold 18px sans-serif';
ctx.textAlign = 'center';//文字水平居中
ctx.fillText(str, (500 / 2), 200) //第一个参数是绘制文本 第二个x设置画布宽度一半 第三个是y坐标
```

### 3.canvas文本右对齐
- 1.首先有个计算文本长度的方法 ctx.measureText(‘文字内容’)
- 2.其次设置x轴的位置为画布宽度500 减去 文字长度即可
```javascript

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var str = '这是需要绘制的文本内容'
 
ctx.font = 'bold 18px sans-serif';
ctx.fillText(str, 500 - ctx.measureText(str).width, 200) //第一个参数是绘制文本 第二个x设置画布宽度减去文字宽度 第三个是y坐标

```

### 4.canvas文本自动换行和设置行间距
- 1.首先有个计算文本长度的方法 ctx.measureText(‘文字内容’)，将文本分割成几份
- 2.其次是依次渲染不同的文本在不同的坐标轴中
```javascript
    createdCanvas() {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var str = '这是需要绘制的文本内容这是需要绘制的文本内容这是需要绘制的文本内容这是需要绘制的文本内容这是需要绘制的文本内容这是需要绘制的文本内容'

      ctx.font = 'bold 18px sans-serif';
      this.drawtext(cxt, str, 10, 10, 400) // 绘制文字并换行
    },

    // 文字换行
    drawtext(ctx, t, x, y, w) {
      //参数说明
      //ctx：canvas的 2d 对象，t：绘制的文字，x,y:文字坐标，w：文字最大宽度
      let chr = t.split("")
      let temp = ""
      let row = []

      for (let a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < w && ctx.measureText(temp + (chr[a])).width <= w) {
          temp += chr[a];
        } else {
          row.push(temp);
          temp = chr[a];
        }
      }
      row.push(temp)
      for (let b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * 20); //每行字体y坐标间隔20-就是行间距
      }

    }

```
