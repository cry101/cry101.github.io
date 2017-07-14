---
title: ionic APP开发相关踩坑
date: 2017-06-15 16:47:08
tags: ionic + angular + cordova
---

### 1.配置各种环境参考资料
（1）[React Native 开发文档](http://reactnative.cn/docs/0.45/getting-started.html)
注：搭建android环境，sdk，之前搞了很久，忘记记录了。。
（2）[angular 中文文档](https://angular.cn/)
（3）[ionic 文档](http://ionicframework.com/docs)
（4）[Gradle构建工具v3.3下载](http://www.pc6.com/softview/SoftView_421983.html)
注：是一个android打包工具，需要配置环境变量，官网下载太慢
（5）[Ionic打包过程下载Gradle失败的解决方法](http://www.jianshu.com/p/9595eccac3d1)
注：暂时没遇到，上次打包了半小时


### 2.ionic 基本功能配置
（1）[ionic2 中隐藏子页面tabs选项卡的三种方法](http://www.cnblogs.com/zsl123/p/6425489.html)
```javascript
//app.module.ts 找到
imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    })
  ],
```
（2）ionic2 返回键文字
```javascript
//app.module.ts 默认是'back'
imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '', //返回按钮文字
    })
  ],
```

（3）[ionic 自定义tabs样式](http://blog.csdn.net/malonely/article/details/52777369)
注：主要是scss
```html
//tabs.html
<ion-tabs tabsPlacement="bottom">  
  <ion-tab [root]="tab1Root" tabTitle="tab1" tabIcon="tab-tab1"></ion-tab>  
  <ion-tab [root]="tab2Root" tabTitle="tab2" tabIcon="tab-tab2"></ion-tab>  
  <ion-tab [root]="tab3Root" tabTitle="tab3" tabIcon="tab-tab3"></ion-tab>  
</ion-tabs>  
```
```css
//tabs.scss
.ion-tab-icon-base {  
  width: 32px;  
  height: 32px;  
  padding: 4px 4px 2px;  
}  
  
.ion-tab-icon-md-base {  
  min-width: 0 !important;  
  height: 32px;  
}  
  
$tabImageName: 'tab1' 'tab2' 'tab3';  
@for $i from 1 to 4 {  
  //for ios  
  .ion-ios-tab-#{nth($tabImageName, $i)} {  
    @extend .ion-tab-icon-base;  
    content: url("../assets/images/tabs/#{nth($tabImageName, $i)}_choosed.png");  
  }  
  .ion-ios-tab-#{nth($tabImageName, $i)}-outline {  
    @extend .ion-tab-icon-base;  
    content: url("../assets/images/tabs/#{nth($tabImageName, $i)}.png");  
  }  
  
  // for android  
  .tabs-md .tab-button[aria-selected=true] {  
    .ion-md-tab-#{nth($tabImageName, $i)} {  
      @extend .ion-tab-icon-md-base;  
      content: url("../assets/images/tabs/#{nth($tabImageName, $i)}_choosed.png");  
    }  
  }  
  .tabs-md .tab-button[aria-selected=false] {  
    .ion-md-tab-#{nth($tabImageName, $i)} {  
      @extend .ion-tab-icon-md-base;  
      content: url("../assets/images/tabs/#{nth($tabImageName, $i)}.png");  
    }  
  }  
}  
```

