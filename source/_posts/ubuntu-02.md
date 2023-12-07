---
title: ubuntu上配置Nodejs
date: 2020-05-02 11:00:50
tags: [ubuntu, nodejs]
categories: ubuntu
index_img: /img/cover/aptq1-jpoq3.png
---

### 1.下载nodejs的二进制文件
```js
wget https://nodejs.org/dist/v12.16.1/node-v12.16.1-linux-x64.tar.xz
```
下载后解压，并移动到 /opt/ 目录下
```js
tar -xf node-v12.16.1-linux-x64.tar.xz
sudo mv node-v12.16.1-linux-x64 /opt/nodejs
```

### 2.设置环境变量
```js
sudo vim /etc/profile  #全局环境变量配置文件
sudo vim ~/.bashrc  #当前用户环境变量配置文件
#node
export NODE_HOME=/opt/nodejs
export PATH=$NODE_HOME/bin:$PATH

#npm
export NODE_PATH=/opt/nodejs/lib/node_modules

source  /etc/profile   你配置的那个文件让他生效
```

### 3.或者通过软连接
通过软连接的形式将node和npm链接到系统默认的PATH目录下
```js
sudo ln -s /opt/nodejs/bin/node  /usr/local/bin/node
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm
```
npm淘宝镜像cnpm
```js
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
```
安装后也设置下软连接
```js
sudo ln -s /opt/node/bin/cnpm /usr/local/bin/cnpm
```

### 4.成功查看版本号
```js
node -v
npm -v
```