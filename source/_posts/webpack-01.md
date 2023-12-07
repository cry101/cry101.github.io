---
title: create-react-app中配置webpack
date: 2018-04-20 09:47:04
tags: ['webpack','react']
categories: React
index_img: /img/cover/react.jpg
---

[Create React App](https://github.com/facebook/create-react-app)（以下简称 CRA）是创建 React 应用的一个脚手架，它与其他脚手架不同的一个地方就是将一些复杂工具（比如 webpack）的配置封装了起来，让使用者不用关心这些工具的具体配置，从而降低了工具的使用难度。
当我们想自己配置webpack的时候可以通过以下几种方式：

### 1.npm run eject
用脚手架创建的项目，package.json 里提供了一条命令：
```javascript
{
  ...
  "scripts": {
    "eject": "react-scripts eject"
  },
  ...
}
```
执行完这条命令，会将封装在CRA中的配置全部反编译到当前项目，这样会直接暴露出webpack的配置，可以直接修改
```text
# eject 后项目根目录下会出现 config 文件夹，里面就包含了 webpack 配置
config
├── env.js
├── jest
│   ├── cssTransform.js
│   └── fileTransform.js
├── paths.js
├── polyfills.js
├── webpack.config.dev.js // 开发环境配置
├── webpack.config.prod.js // 生产环境配置
└── webpackDevServer.config.js
```
CRA 与其他脚手架不同的另一个地方，就是可以通过升级其中的react-scripts包来升级 CRA 的特性。比如用老版本 CRA 创建了一个项目，这个项目不具备 PWA 功能，但只要项目升级了react-scripts包的版本就可以具备 PWA 的功能，项目本身的代码不需要做任何修改。

但如果我们使用了eject命令，就再也享受不到 CRA 升级带来的好处了，因为react-scripts已经是以文件的形式存在于你的项目，而不是以包的形式，所以无法对其升级。

### 2.替换react-scripts包
[react-script](https://github.com/facebook/create-react-app/tree/8cae659ec5a066eff8ea270346dc8c1ef064f9aa/packages/react-scripts)react-scripts 是 CRA 的一个核心包，一些脚本和工具的默认配置都集成在里面，使用 CRA 创建项目默认就是使用这个包，但是 CRA 还提供了另外一种方式来创建 CRA 项目，即使用自定义 scripts 包的方式。

```text
# 默认方式
$ create-react-app foo

# 自定义 scripts 包方式
$ create-react-app foo --scripts-version 自定义包
```
自定义包可以是下面几种形式：
(1)react-scripts包的版本号，比如0.8.2，这种形式可以用来安装低版本的react-scripts包。
(2)一个已经发布到 npm 仓库上的包的名字，比如your-scripts，里面包含了修改过的 webpack 配置。
(3)一个 tgz 格式的压缩文件，比如/your/local/scripts.tgz，通常是未发布到 npm 仓库的自定义 scripts 包，可以用 npm pack 命令生成。
这种方式相对于之前的eject是一种更灵活地修改 webpack 配置的方式，而且可以做到和 CRA 一样，通过升级 scrips 包来升级项目特性。

自定义 scripts 包的结构可以参照react-scripts包的结构，只要修改对应的 webpack 配置文件，并安装上所需的 webpack loader 或 plugin 包就可以了。

### 3.使用react-app-rewired
虽然有这两种方式可以扩展 webpack 配置，但是很多开发者还是觉得太麻烦，有没有一种方式可以既不用eject项目又不用创建自己的 scripts 包呢？
答案是肯定的，[react-app-rewired](https://github.com/timarney/react-app-rewired) 是 react 社区开源的一个修改 CRA 配置的工具。

在 CRA 创建的项目中安装了react-app-rewired后，可以通过创建一个config-overrides.js 文件来对 webpack 配置进行扩展。
```javascript
/* config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
	config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);

	config.resolve.alias = {
		'@': resolve('src')
	};
	config.devtool = process.env.NODE_ENV === 'development'? '#eval-source-map': false;

	return config;
};
```
override方法的第一个参数config就是 webpack 的配置，在这个方法里面，我们可以对 config 进行扩展，比如安装其他 loader 或者 plugins，最后再将这个 config 对象返回回去。

最后再修改package.json中的脚本命令
```json
/* package.json */
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
}
```

### 4.scripts 包 + override 组合
虽然react-app-rewired的方式已经可以很方便地修改 webpack 的配置了，但其实我们也可以在自定义的 script 包中实现类似的功能。

在react-app-rewired的源码中可以看到它核心的包也叫 react-app-rewired，里面重新覆盖了react-scripts中的几个脚本文件，包括build.js、start.js和test.js。

具体过程是怎样的呢？以build.js为例：
(1)先获取 webpack 的基本配置，然后再调用config-overrides.js（就是在根目录中新增的那个文件）中的override方法，将原先的 webpack 对象作为参数传入，
(2)再取得经过修改后的 webpack 配置对象
(3)最后再调用react-scripts中的build.js脚本，传入修改后的 webpack 对象来执行命令，
具体源码如下：
```javascript
const overrides = require('../config-overrides');
const webpackConfigPath = paths.scriptVersion + "/config/webpack.config.prod";

// load original config
const webpackConfig = require(webpackConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  overrides.webpack(webpackConfig, process.env.NODE_ENV);
// run original script
require(paths.scriptVersion + '/scripts/build');
```
知道了原理之后，我们也可以修改自定义 scripts 包的脚本文件，还是以build.js为例，在获取基本 webpack 配置对象和使用 webpack 对象之间加入以下代码：
```javascript
// override config
const override = require(paths.configOverrides);
const overrideFn = override || ((config, env) => config);
const overrideConfig = overrideFn(config, process.env.NODE_ENV);
```
overrideConfig就是修改后的 webpack 对象，最后修改调用了 webpack 对象的代码，将原来的 webpack 对象替换成修改后的 webpack 对象。



[原文地址](https://zhaozhiming.github.io/blog/2018/01/08/create-react-app-override-webpack-config/)

