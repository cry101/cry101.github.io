---
title: javascript的audio相关
date: 2022-10-28 14:48:47
tags: javascript
categories: Javascript
index_img: /img/cover/0f7ab95b.webp
---

### 1.播放暂停
```javascript
const audio = new Audio()
audio.volume = 0.2 // 控制音量 0~1
audio.loop = true // 循环播放
audio.src = 'xxx.mp3' // 音频地址

if (audio.paused) { // 切换状态
    audio.play()
} else {
    audio.pause()
}
```

### 2.监听无用户操作，无法自动播放
```javascript
const audio = new Audio()
const audioPlay = audio.play()
audioPlay.then(() => {
    // 正常播放操作
}).catch(() => {
    // 无法播放 做一些交互
    // 音频元素只在用户交互后调用.play()
})
```
