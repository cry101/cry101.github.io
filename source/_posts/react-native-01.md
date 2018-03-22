---
title: react-native踩坑中
date: 2018-01-29 15:19:43
tags: ['react-native','react']
---

### 1.react相关注意点
（1）超过最大更新深度
error
```html
Maximum update depth exceeded. 
This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. 
React limits the number of nested updates to prevent infinite loops.
```
(2)弃用PropTypes
[文档](http://www.css88.com/react/docs/typechecking-with-proptypes.html)
从 React v15.5 开始 ，React.PropTypes 助手函数已被弃用，我们建议使用 [prop-types](https://github.com/facebook/prop-types) 库 来定义contextTypes。

### 2.配置极光推送
[官方插件](https://github.com/jpush/jpush-react-native)
注：
（1）在项目的AndroidManifest.xml里面加上下面代码,注意下protectionLevel，这里是权限保护设置。
```html
<!--添加通知权限，${ApplicationID}替换成你的applicationID!-->
    <premission 
        android:name="${ApplicationID}.permission.JPUSH_MESSAGE"
        android:protectionLevel="signature"/>
```
（2）打开node_modules/jpush_react-native/android/src/AndroidManifest.xml，将所有的${applicationId}替换成你的包名。
或者通过android studio打开找到jpush_react-native项目下的AndroidManifest.xml。

(3) error:
Undefined is no a function evaluating cb(resultCode)

### 3.配置iconfont
[配置阿里下载的iconfont](https://www.jianshu.com/p/96d5c66791c3)


### 4.run-ios闪退
用Xcode直接编译运行没有问题，
利用终端命令react-native run-ios 出现闪退问题。

解决方案：由于我使用翻墙软件，造成localhost不能识别本地ip。只需要退出翻墙软件即可正常运行。


### 5.redux的使用
[参考](https://www.jianshu.com/p/2c43860b0532)
step1： //root.js
```jsx harmony
// import react-native
import React from 'react-native'
// same for react-redux
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'

import App from './containers/app'

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
 }

export default Root
```
step2:
```jsx harmony
import React from 'react-native'

const {
  AppRegistry
} = React

import Root from './root'

AppRegistry.registerComponent('soundreduxNative', () => Root)
```



### 6.redux-persist(数据持久化)
[官方文档](https://github.com/rt2zz/redux-persist)
```jsx harmony
//store.js

import { applyMiddleware, createStore } from 'redux'; //数据管理
import thunk from 'redux-thunk'; //异步action
import { persistStore, persistReducer } from 'redux-persist'; //数据持久化
import { AsyncStorage } from 'react-native'; //引入本地存储
import reducers from '../reducers'; //引入combine后的reducer

//追踪action和state变化 http://www.redux.org.cn/docs/advanced/Middleware.html
const logger = store => next => action => {
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

//中间件
let middlewares = [
	logger,
	thunk
];

let createAppStore = applyMiddleware(...middlewares)(createStore);

//配置redux-persist
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
	let store = createAppStore(persistedReducer)
	let persistor = persistStore(store)
	return { store, persistor }
}

```
似乎可以实现loading功能
```jsx harmony
//index.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'

import configureStore from './store/index';

let { store, persistor } = configureStore();

import Root from './root';


const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Root />
			</PersistGate>
		</Provider>
	);
};

export default App;

```

还有问题的话，回退到v4的版本 [参考](https://github.com/ninty90/react-native-redux-demo)

### 7.react-native中使用svg
[react-native-svg](https://github.com/react-native-community/react-native-svg)
[react-native-svg-uri](https://github.com/vault-development/react-native-svg-uri)

[参考](https://www.jianshu.com/p/7db2bc62c5ed)

error:
(1)react-native 出现 No component found for view with name “RNSVG***”
[ios](https://www.jianshu.com/p/b51b79ca14e7)

(2)No ViewManager defined for class RNSVGPath
重启下项目。。

### 8.react-native中Image的默认图片
在外层包一层ImageBackground


### 9.配置react-native-image-crop-picker
[文档](https://github.com/ivpusic/react-native-image-crop-picker)
[翻译](https://www.jianshu.com/p/8420b08062c7)
[配置](http://blog.csdn.net/sinat_17775997/article/details/74908864)

### 10.warning: enableEmptySections
当升级完react-native的版本时，run-android的时候会报警告
Warning:In next release empty section headers will be rendered.
In this release you can use 'enableEmptySections' flag to render empty section headers
解决方法是：
在ListView下 加个 enableEmptySections = {true} 就可以解决了

### 11.react-native-swipe-list-view在tabnavigate里渲染异常
侧滑部分无法显示，后改用react-native-swipeable
https://github.com/jshanson7/react-native-swipeable

### 12.iOS模拟器突然变成了慢动作？
iOS模拟器有个slow animation的选项，其快捷键是commant + T，调试过程中容易误碰到。再按一次关闭这个选项即可。

### 13.常见问题
常见问题：http://bbs.reactnative.cn/topic/130/%E6%96%B0%E6%89%8B%E6%8F%90%E9%97%AE%E5%89%8D%E5%85%88%E6%9D%A5%E8%BF%99%E9%87%8C%E7%9C%8B%E7%9C%8B-react-native%E7%9A%84%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/2

### 14.Bridge桥接报错
可能是属于项目出问题，我这边遇到的是不能用cnpm来安装依赖

### 15.android打包apk报错
（1）Lint found fatal errors while assembling a release target.
为了解决多个manifest中相同activity重复注册的问题，在build.gradle中增加以下代码：
```javascript
android {
	...
	lintOptions {
          checkReleaseBuilds false
          // Or, if you prefer, you can continue to check for errors in release builds,
          // but continue the build even when errors are found:
          abortOnError false
      }
}

```
(2)Execution failed for task ':app:bundleReleaseJsAndAssets'.
解决办法，命令行先执行 ./gradlew --stop然后执行 ./gradlew assembleRelease


### 16.注意事项
（1）安卓下时间格式不要 2018-02-12 12:12:12
最好是'/'格式 time.replace(/-/g,  "/")

(2)error: Cannot add a child that doesn't have a YogaNode or parent node
```javascript
{
	this.state.sign && <Text style={{color: Color.grey,textAlign: 'right'}}>{this.state.sign.length}/50</Text>
}
```

发现是在 this.state.sign变空的过程中，Text销毁触发的错误？
后改为
```javascript
<Text style={{color: Color.grey,textAlign: 'right'}}>{this.state.sign?this.state.sign.length: 0}/50</Text>

```
