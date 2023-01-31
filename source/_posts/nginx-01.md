---
title: nginx配置https
date: 2020-05-06 16:31:50
tags: [nginx]
index_img: https://s2.loli.net/2022/05/20/PLfaJmwn2YxvuoA.jpg
---

### 1.nginx配置https
nginx目录下新建cert文件夹，把证书文件放里面
```shell
upstream api2 {
    server www.domain.cn:444; # 另外的服务
}

server {
    listen 443 ssl;

    server_name  www.domain.cn; #修改为您证书绑定的域名。

    ssl_certificate      cert/domain.pem; #替换成您的证书文件的路径。
    ssl_certificate_key  cert/domain.key; #替换成您的私钥文件的路径。
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5; #加密套件。
    ssl_prefer_server_ciphers  on;
    location / {
        root   /var/www/hexo; #站点目录。
        index  index.html index.htm; #添加属性。
    }

    location /api/ { # 代理地址成 /api
            proxy_pass https://api2/;
            port_in_redirect   on;
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```
修改完重启
```shell
nginx -s reload
```

### 2.nodejs配置https
```js
const https = require("https");

/**
 * Create HTTP server.
 */
// Configuare https
const httpsOption = {
    key : fs.readFileSync(path.resolve(__dirname, "./https/domain.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "./https/domain.pem"))
}
// 端口444 避免和nginx冲突
https.createServer(httpsOption, app).listen(444); 
```