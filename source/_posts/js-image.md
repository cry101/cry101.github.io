---
title: 关于canvas绘制图片预加载
date: 2019-01-28 11:39:50
tags: [js, canvas]
index_img: https://s2.loli.net/2022/05/20/XKZuN9tTovqnBMk.jpg
---

### 1.image的onload
由于canvas的drawImage需要图片加载完成后才能调用,所以常见写法：
```javascript
window.onload=function(){
    var Canvas=document.getElementById("canvas");
    var cxt=Canvas.getContext("2d");
    var bg=new Image();
    //先指定一个回调函数，图片加载好之后自然会回来执行
    bg.onload = function () {
        cxt.drawImage(bg,0,0);
    };
    //加载图片，完成后执行刚才的函数
    bg.src="../img/xxx.jpg";
};
```
按照es6写法：
```javascript
// 预加载图片
function loadImage(url) {
		return new Promise((resolve, reject) => {
				let img = new Image();
				img.onload = () => resolve(img);
				img.onerror = reject;
				img.src = url;
		})
}
	
// 预处理图片
function preLoadImg(source){
		let pr = [];
		source.forEach(url => {// 预加载图片
				let p = loadImage(url)
								.then(img => this.images.push(img))
								.catch(err => console.log(err))
				pr.push(p);
		})

		// 图片全部加载完
		Promise.all(pr)
						.then(() => {
								// do sth
						});

}
```

### 2.image的complete
onload是图片加载完成执行的事件，complete属性是图片显示出来以后为true。
那么在onload之前complete肯定是false的，这个毋庸置疑。那么我们就可以在onload事件内部判断complete属性是否为true。
如果为true那么代表图片真正的加载成功，否则可以重新加载。

```javascript
var l =5;
var Images = new Array(l);
var ImgLoaded =0;

//设置加载队列
function LoadImgs()
{
    for(var i=0;i<Images.length;i++){
        Images[i]=new Image();
        downloadImage(i);
    }
}

//加载单个图片文件
function downloadImage(i)
{
    var imageIndex = i+1; //图片以1开始
    Images[i].src = "images/"+imageIndex+".jpg";
    Images[i].onLoad=validateImages(i);
}

//验证是否成功加载完成，如不成功则重新加载
function validateImages(i){
    if (!Images[i].complete)
    {
        window.setTimeout('downloadImage('+i+')',200);
    }
    else if (typeof Images[i].naturalWidth != "undefined" && Images[i].naturalWidth == 0)
    {
        window.setTimeout('downloadImage('+i+')',200);
    }
    else
    {
        ImgLoaded++
        if(ImgLoaded == l)
        {
            alert('图片加载完毕！');
        }
    }
}

```





