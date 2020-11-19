---
title: redux常用中间件
date: 2018-05-10 16:22:44
tags: [react, redux]
categories: React
---

## redux中间件配置
store.js
```javascript
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'; //异步action
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'; //数据持久化
import reducers from '../reducer';
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger' //日志中间件
import mySaga from '../actions/sagas'

// const logger = store => next => action => {
// 	let result = next(action);
// 	const arr = ['GROUP/COUNT_DOWN'];
// 	if(arr.indexOf(action.type) >= 0){ return result; }
// 	if(typeof action === 'function') console.log('dispatching a function');
// 	else console.log('dispatching', action);
// 	console.log('next state', store.getState());
// 	return result;
// }

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
	predicate: (getState, action) => action.type !== 'GROUP/COUNT_DOWN' //相关类型不打印
});

let middlewares = [
	thunk,
	sagaMiddleware
];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(logger);
}

let createAppStore = applyMiddleware(...middlewares)(createStore);

const persistConfig = {
	key: 'root',
	storage
};
const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
	let store = createAppStore(persistedReducer)
	let persistor = persistStore(store)
	sagaMiddleware.run(mySaga)
	return { store, persistor }
}

```

### 1.[redux-thunk](https://github.com/reduxjs/redux-thunk)
用于异步action，允许你的action可以返回函数, 带有dispatch和getState两个参数, 在这个action函数里, 异步的dispatch action;


### 2.[redux-saga](https://github.com/redux-saga/redux-saga)
功能类似redux-thunk，用于异步action，原理是通过generator函数，相比于thunk更复杂一些，集中处理了action，支持dispatch后的回调。


### 3.[redux-logger](https://github.com/LogRocket/redux-logger)
在控制台打印redux过程，类似的也可以按redux文档示范的中间件，但是感觉logger的颜色更好看
```javascript
const logger = store => next => action => {
	let result = next(action);
	const arr = ['GROUP/COUNT_DOWN'];
	if(arr.indexOf(action.type) >= 0){ return result; }
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	console.log('next state', store.getState());
	return result;
}
```

### 4.[redux-persist](https://github.com/rt2zz/redux-persist)
实现数据持久化，自动存入localStorage，配置略麻烦


