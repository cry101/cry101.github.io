---
title: ubuntu上部署hexo博客
date: 2019-05-01 21:13:34
tags: [ubuntu,hexo]
categories: ubuntu
index_img: https://cdn.jsdelivr.net/gh/cry101/ImgHosting/img/ubuntu.jpg
---

### 1.服务器配置 ubuntu
#### （1）安装git和nginx
```js
sudo apt-get update
sudo apt-get install git nginx -
ssh-keygen -t rsa -C "email@xxx.com"
```

#### （2）创建git用户
实际测试中，发现发布的时候root用户一直提示Permision Denied，所以另外创建个git用户
```js
adduser git

// 去修改权限
vim /etc/sudoers
```
在下方添加git用户
```js
## Allow root to run any commands anywhere
root    ALL=(ALL)     ALL
git     ALL=(ALL)     ALL # 新增的
```
然后为了方便配置下ssh，本地获取rsa公钥
```js
ssh-keygen -t rsa -f ~/.ssh/github_id_rsa #没有就创建

cat ~/.ssh/id_rsa.pub  #打开本地的ssh公钥并且复制
```
复制到服务器上
```js
.ssh/authorized_keys
```

#### （3）创建私有 Git 仓库
创建目录 /var/repo 然后修改目录的所有权和用户权限
```js
sudo mkdir /var/repo/
sudo chown -R $USER:$USER /var/repo/
sudo chmod -R 777 /var/repo/
```
创建git bare裸仓库，方便后续勾子操作
```js
cd /var/repo/
git init --bare hexo_static.git
```

#### （4）配置 Nginx 托管文件目录
```js
sudo mkdir -p /var/www/hexo

sudo chown -R $USER:$USER /var/www/hexo
sudo chmod -R 755 /var/www/hexo
```
修改nginx配置
```js
sudo vim /etc/nginx/sites-available/default

// 指向托管目录
...
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;
 
    root /var/www/hexo; # 需要修改的部分
    index index.html index.htm;
...
```
重启nginx服务，使改动生效

```js
sudo service nginx restart
```
#### （4）创建git钩子
在服务器上的裸仓库 hexo_static 创建一个钩子，在满足特定条件时将静态 HTML 文件传送到 Web 服务器的目录下，即 /var/www/hexo
```js
vim /var/repo/hexo_static.git/hooks/post-receive
```
在该文件中添加两行代码，指定 Git 的工作树（源代码）和 Git 目录（配置文件等）。
```js
#!/bin/bash
 
git --work-tree=/var/www/hexo --git-dir=/var/repo/hexo_static.git checkout -f
```
保存并退出文件，并让该文件变为可执行文件。
```js
chmod +x /var/repo/hexo_static.git/hooks/post-receive
```

### 2.本地hexo配置
nodejs环境，git环境
```js
npm install hexo-cli hexo-server -g

// 创建blog
hexo init ~/hexo_blog
```
修改本地hexo配置，_config.yml 为 Hexo 的主配置文件
```js
url: http://server-ip # 没有绑定域名时填写服务器的实际 IP 地址。
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:

# Writing draft是草稿，必须经过publish才可以
new_post_name: :title.md # File name of new posts
default_layout: draft # 原来的值是 post
titlecase: false # Transform title into titlecase

# 发布配置 repo: 用户名@ip:/目录
deploy:
    type: git
    repo: git@IP地址:/var/repo/hexo_static
    # repo: ubuntu@CVM 云服务器的IP地址:/var/repo/hexo_static
    branch: master
```
安装一个 Hexo 包，负责将博客所需的静态内容发送到设置好的 Git 仓库
```js
npm install hexo-deployer-git --save
```
最后生成并发布
```js
hexo generate && hexo deploy

```
