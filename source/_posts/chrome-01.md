---
title: chrome调试输入框下拉元素技巧
date: 2023-04-12 11:33:49
tags: [chrome,dev]
categories: 技巧
index_img: /img/cover/13.webp
---

### 如何调试搜索框选中下拉元素的样式。
因为当切到 Element，focus会失去焦点，搜索框下边的内容就会消失掉。

可以通过chrome浏览器设置：MoreTools => Rendering
![chrome](/img/content/1.png)
开启 Emulate a focused page，此时下拉就出来了。
![chrome](/img/content/2.png)