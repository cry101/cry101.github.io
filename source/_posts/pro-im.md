---
title: IM即时聊天项目
date: 2018-03-19 10:29:47
tags: project
---

## 项目简介
[移动端测试地址](http://120.78.155.16:8080/)
### 依赖简介
* web端：vue,vuex,vue-router,axios,mint-ui,sass
```javascript
//相关依赖
"dependencies": {
  "axios": "^0.17.0", //异步请求
  "clipboard": "^1.7.1", //复制剪切板
  "echarts": "^3.8.5", //百度图表
  "js-md5": "^0.7.2", //md5加密
  "mint-ui": "^2.2.9", //移动端ui框架
  "vue": "^2.0.1", //vue
  "vue-awesome-swiper": "^2.3.8", //图片浏览组件
  "vue-cropper": "^0.2.5", //图片裁剪上传
  "vue-navigation": "^1.1.1", //路由管理
  "vue-touch": "^2.0.0-beta.4", //移动端
  "vuex": "^2.0.0", //状态管理
  "whatwg-fetch": "^1.0.0" //兼容fetch
}
```
* 后台管理系统： vue,vuex,vue-router,axios,elementUI
* app端：react-native,react,redux,react-navigation
```javascript
//相关依赖
"dependencies": {
    "jcore-react-native": "^1.2.5", //极光推送相关
    "jpush-react-native": "^2.1.11", //极光推送相关
    "js-md5": "^0.7.3", //md5加密
    "prop-types": "^15.6.1", //prop type检查
    "react": "16.2.0", //react
    "react-native": "0.52.2", //react-native
    "react-native-check-box": "^2.1.0", //兼容ios checkbox
    "react-native-elements": "^0.19.0", //elements ui库
    "react-native-image-crop-picker": "^0.19.3",//图片裁剪选取组件
    "react-native-photo-browser": "^0.4.0", //图片浏览组件
    "react-native-picker": "^4.3.5", //时间等等选择器
    "react-native-popup-menu": "^0.12.2",//popup弹窗组件
    "react-native-push-notification": "^3.0.2",//本地推送组件
    "react-native-svg": "^6.2.2", //使用svg的组件
    "react-native-swipe-list-view": "^1.0.5", //侧滑删除组件
    "react-native-swipeable": "^0.6.0", //侧滑删除组件
    "react-native-vector-icons": "^4.5.0",//icon组件
    "react-native-wechat": "^1.9.9",//微信相关接口组件
    "react-navigation": "^1.4.0",//路由控制
    "react-redux": "^5.0.7",//状态管理
    "redux": "^3.7.2", //状态管理
    "redux-persist": "^5.9.1", //redux数据持久化中间件
    "redux-thunk": "^2.2.0", //异步redux中间件
    "whatwg-fetch": "^2.0.3" //兼容fetch
  }
```

### 功能简介
web端和app端公用接口，统一功能，后台管理系统多为表格。
以社群功能为主，包括创建社群，社群管理，群里可发布话题和活动，话题管理，活动管理，话题是基于websocket实现文字表情图片等多人聊天，
群权限分为群主管理员成员，相关权限功能：密码，发布权限，审核权限，禁言等等。
另外几块是私聊消息，系统消息，好友模块，用户模块。


### 图片简介
考虑到又是一个没正式上线的项目,所以截下来放点图片好了
#### 首页社群web版：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/1.jpg)

#### 群详情web版：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/2.jpg)

#### 话题群聊web版：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/3.jpg)

#### 活动详情web版：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/4.jpg)

#### 私聊web版：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/5.jpg)

#### 消息列表app安卓：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/6.jpg)

#### 系统消息app安卓：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/7.jpg)

#### 好友列表app ios：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/8.jpg)

#### 个人中心app ios：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/9.jpg)

#### 后台管理登陆：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/10.jpg)

#### 后台管理某页面：
![图片](https://raw.githubusercontent.com/cry101/Some-little-projects/master/image/dapaijiadao/11.jpg)





