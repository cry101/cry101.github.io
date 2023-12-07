---
title: ubuntu上配置MongoDB
date: 2020-05-05 09:32:50
tags: [ubuntu, MongoDB]
categories: ubuntu
index_img: /img/cover/aptq1-jpoq3.png
---

### 1.服务器上下载解压MongoDB
[官网下载](https://www.mongodb.com/try/download/community)

通过wget远程下载
```shell
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-5.0.7.tgz
```
解压
```shell
tar -zxvf mongodb-linux-x86_64-ubuntu2004-5.0.7.tgz
```

### 2.启动MongoDB服务
创建目录
```shell
sudo mkdir -p /var/lib/mongo     # 创建数据存储目录
sudo mkdir -p /var/log/mongodb   # 创建日志文件目录
```
启动服务
```shell
./mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```
可以通过查看日志确认是否启动
```shell
cat /var/log/mongodb/mongod.log # 将显示服务后台的输出
```

### 3.MongoDB备份和恢复
备份
```shell
mongodump -h dbhost -d dbname -o dbdirectory
# -h MongoDB 所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
# -d 需要备份的数据库实例，例如：test
# -o 备份的数据存放位置，例如：c:\data\dump
```

恢复
```shell
mongorestore -h <hostname><:port> -d dbname <path>
# --host <:port>, -h <:port>：MongoDB所在服务器地址，默认为： localhost:27017
# --db , -d ：需要恢复的数据库实例，例如：test
# --drop：恢复的时候，先删除当前数据，然后恢复备份的数据
# <path> ：设置备份数据所在位置，例如：c:\data\dump\test
```
tips: 这两个工具可能需要另外安装

### 4.pm2安装
```shell
npm install pm2 -g

# pm2 command not found 尝试建立软连接
ln -s /opt/nodejs/bin/pm2 /usr/local/bin

# node目录可以通过查找
whereis node
```
