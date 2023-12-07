---
title: ubuntu上安装docker
date: 2020-05-15 09:50:38
tags: [ubuntu, docker]
categories: ubuntu
index_img: /img/cover/aptq1-jpoq3.png
---
[官网教程](https://docs.docker.com/engine/install/ubuntu/)

### 1.卸载旧版本docker
```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 2.更新及安装工具软件
#### (1) 更新系统软件
```shell
sudo apt-get update
```

#### (2) 安装工具
```shell
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

#### (3) 增加docker的官方GPG key
```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

#### (4)下载仓库文件
```shell
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 3.安装docker
```shell
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### 4.测试运行docker容器
```shell
sudo docker run hello-world
```