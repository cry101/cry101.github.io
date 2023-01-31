---
title: weex小记
date: 2017-12-27 17:10:25
tags: [vue,weex]
index_img: https://s2.loli.net/2023/01/31/wfzOKhdVeFpgU1R.jpg
---
### 1.weex和浏览器的差异
（1）weex中不存在window对象



### 2.[weex中使用scss](http://blog.csdn.net/seafishyls/article/details/64444819)
官方lang="stylus"
使用scss则会报错: scss-loader not found
似乎weex-loader中会自动根据lang寻找对应的loader
然而scss使用的是sass-loader 造成了名称不对应的情况


可通过标签引入
```html
<style src='./style.css' />
```
serve下@import同个文件，会造成px解析不对




### 3.weex与vue-route
vue-router不能支持导航链接，只支持编程式导航


### 4.[weex选取图片](https://github.com/voids/weex-image-crop-picker)


### 5.weex plugin add *** 报错，安卓环境问题
could not find gradle wrapper within android sdk
https://www.jianshu.com/p/5d925413c79f

### 6.Couldn't find preset "env" relative to directory
https://www.cnblogs.com/ye-hcj/p/7070084.html

* 弃坑，无极光推送相关插件。。

### 7.为什么app端的登陆验证需要在请求头加token
因为传统浏览器端的登陆验证是通过cookie的值，而app使用需要后端设置跨域：
```javascript
//Access-Control-Allow-Origin: '*',
```
而带cookie请求需要设置credentials mode 为 'include'
```javascript
//比如fetch需要设置 
{ credentials: "include" }//带cookie请求

//axios需要设置
{ withCredentials: true} //带cookie请求
```
此时会报错
The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.

所以最后的解决方案是通过把登陆校验的值放在请求头里

{% note info %}
Cordova打包相关：
{% endnote %}

### 8.打包的时候路由模式hash


### 9.移动端字体兼容问题
```html
//有兼容问题的字体图标加载顺序
@font-face {font-family: "iconfont";
  src: url('iconfont.eot'); /* IE9*/
  src: url('iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('iconfont.woff') format('woff'), /* chrome、firefox */
  url('iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}
```

```html
//移动端字体图标
@font-face {font-family: "iconfont";
  src: url('../font/iconfont.eot'); /* IE9*/
  src: url('../font/iconfont.svg#iconfont') format('svg'), /* iOS 4.1- */
  url('../font/iconfont.woff') format('woff'), /* chrome、firefox */
  url('../font/iconfont.ttf') format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ 
}
```


### 10.Cordova android emulator “cannot read property 'replace' of undefined”
Tracked it down to file /platforms/android/cordova/lib/emulator.js line 202:

var num = target.split('(API level ')1.replace(')', '');

Replace it with a regex search and extraction:

var num = target.match(/\d+/)[0];


### 11.打包成app fetch用不了的情况：
```html
npm install whatwg-fetch --save
//文件中引入
import 'whatwg-fetch';
```

### 12.打包app 
http://blog.csdn.net/fifteen718/article/details/64125953
assetsPublicPath: './',  // 编译发布的根目录

index.html 引入的外部文件按绝对路径
<%=htmlWebpackPlugin.options.ImgHost %>static/xxx/xxx.js




