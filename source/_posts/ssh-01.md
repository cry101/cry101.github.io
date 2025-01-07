---
title: Windows 配置多个ssh秘钥
date: 2023-09-12 14:24:31
tags: Git
index_img: /img/cover/0f7ab95b.webp
---

### 1.生成公私钥
```
keygen-ssh -t rsa -C "124@qq.com" -f "文件名"
```

### 2.添加配置文件
在 ./ssh 目录下新增 config 文件
```
Host github.com
HostName github.com
IdentityFile C:\Users\12388\.ssh\github_id_rsa
PreferredAuthentications publickey

Host gitlab.com
HostName gitlab.com
IdentityFile C:\Users\12388\.ssh\id_rsa
PreferredAuthentications publickey
```

### 3.测试
```
ssh -T git@github.com
```

### 4.问题 Permissions 0777
- [密钥权限过大错误]ssh “Permissions 0777 permissions are too open” error
- 别人那边拷贝过来的密钥，很多时候无法直接登录ssh，会报错permissions are too open。
这个时候需要修改id_rsa的权限，一般修改为600就好。
```
chmod 600 ~/.ssh/id_rsa
```