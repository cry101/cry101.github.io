---
title: node18+版本启动vue2项目报错
date: 2025-01-07 14:46:00
tags: [vue,javascript]
categories: Vue
index_img: /img/cover/3.webp
---

### 1.报错信息
```
error:03000086:digital envelope routines::initialization error
```
是由于 Node.js v17 及以后的版本默认启用了 OpenSSL 3.0，而 Vue 2 和许多依赖的包在与 OpenSSL 3.0 兼容时可能会出现问题。特别是，使用 Webpack 和一些依赖时可能会遇到加密初始化的错误。

### 2.解决办法
#### (1). 使用 Node.js v16（推荐）
最直接的解决方法是将 Node.js 降级到 v16（LTS版本）。Node.js v16 没有启用 OpenSSL 3.0，因此不会遇到这种错误。你可以使用 nvm（Node Version Manager）来管理不同版本的 Node.js。

安装并切换 Node.js 版本：

- 1.安装 nvm（如果尚未安装）：

对于 Mac/Linux，你可以通过运行以下命令安装 nvm：
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
对于 Windows，你可以下载并安装 nvm-windows：nvm-windows releases

- 2.安装 Node.js v16：
```bash
nvm install 16
nvm use 16
```
- 3.确认 Node.js 版本：

```bash
node -v
```

- 4.然后重新启动你的 Vue 项目：
```bash
npm install
npm run serve
```

#### (2). 强制 Node.js 使用 OpenSSL 1.1
如果你希望继续使用 Node.js v17 或更高版本，可以通过设置环境变量来强制 Node.js 使用 OpenSSL 1.1，而不是默认的 OpenSSL 3.0。

在命令行中运行：
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
- Windows（CMD）：

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```
- Windows（PowerShell）：

```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

#### (3). 永久解决方案
如果你希望每次启动时都自动使用 --openssl-legacy-provider，可以将环境变量添加到你的 package.json 脚本中：

在 package.json 中的 scripts 部分，添加以下内容：

```json
"scripts": {
  "serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
  "build": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build"
}
```
对于 Mac/Linux 用户，可以在 package.json 中的 scripts 部分使用：

```json
"scripts": {
  "serve": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service serve",
  "build": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service build"
}
```
这样每次运行 npm run serve 或 npm run build 时，都会自动设置这个环境变量。
