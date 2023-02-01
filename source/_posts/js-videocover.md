---
title: 基于canvas获取video的封面
date: 2020-02-21 15:38:21
tags: [js, canvas]
index_img: https://s2.loli.net/2022/05/20/XKZuN9tTovqnBMk.jpg
---

### 1.获取视频第一帧为封面
```javascript
export function getVideoCover(file, response) {
    const fileUrl = URL.createObjectURL(file);
    const videoElement = document.createElement('VIDEO');
    // 需要预加载才绘制的出来
    videoElement.preload = true; 
    videoElement.autoplay = true;
    videoElement.muted = true;
    const callBack = () => {
        // 获取video的宽高
        const { videoWidth, videoHeight } = videoElement;  
        const canvas = document.createElement('canvas');
        canvas.width = videoWidth ;
        canvas.height = videoHeight;
        const ctx = canvas.getContext('2d');
        // 绘制第一帧
        ctx.drawImage(videoElement, 0, 0, videoWidth, videoHeight); 
        const dataBase64 = canvas.toDataURL('image/png'); // 完成base64图片的创建
        if (dataBase64) {
            const imgFile = dataURLtoFile(dataBase64, `${new Date().getTime()}.png`);
            if (response) {
                response(imgFile, dataBase64);
            }
        }
    };
    videoElement.onloadeddata = setTimeout(() => {
        callBack();
    }, 1000);;
    videoElement.src = fileUrl;
}

/**
 * base64图片转file
*/
export function dataURLtoFile(dataBase64, filename) {
    const arr = dataBase64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

```
