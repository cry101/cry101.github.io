---
title: Linux centos 安装nodejs完整教程
date: 2024-01-04 14:24:05
tags: [nodejs]
categories: Nodejs
index_img: /img/cover/nodejs.jpg
---


### 1.在服务器自己新建一个放nodejs的目录
```cmd
mkdir -p /opt/program/nodejs
```

### 2.下载nodejs
- 下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
```cmd
cd /opt/program/nodejs

wget https://nodejs.org/download/release/v16.20.2/node-v16.20.2-linux-x64.tar.gz
```

### 3.解压gz包
```cmd
tar -zxvf node-v14.6.0-linux-x64.tar.gz
```

### 4.文件夹重命名
```cmd
mv node-v14.6.0-linux-x64 nodejs
```

### 5.配置环境变量
```cmd
vim /etc/profile
```
- 嗯i进入编辑模式
- shift+G 进入最后一行
- 输入下面的配置
```cmd
#node

NODE_HOME=/opt/program/nodejs/nodejs

export PATH=$NODE_HOME/bin:$PATH
```
- exit退出编辑
- :wq保存并推出
- 重新编译配置文件
```cmd
source /etc/profile
```
- 查看是否安装成功
```cmd
node -v
```
