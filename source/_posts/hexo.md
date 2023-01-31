---
title: hexo基本用法
date: 2017-01-01 14:30:30
tags: hexo
index_img: https://s2.loli.net/2023/01/31/wfzOKhdVeFpgU1R.jpg
---

### 1.基础操作
新建文章
```js
hexo n name // name 文件目录、名称
```

生成静态文件
```js
hexo generate
```

启动本地服务
```js
hexo server
```

清除文件
```js
hexo clean
```

部署博客
```js
hexo deploy
```
1.需要先渲染博客，也就是hexo g（可以hexo g -d一步操作）
2.还需要配置博客目录下 _config.yml 文件中的deploy模块
```js
deploy:
    type: git
    repo: <git地址>
    branch: master
```