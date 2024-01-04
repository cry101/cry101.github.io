---
title: nuxt3 环境变量配置
date: 2023-04-04 10:18:32
tags: [vue,vue3,nuxt]
categories: Vue
index_img: /img/cover/nuxt.png
---

### 1.runtimeConfig 运行时配置
常用来配置密钥、接口地址等 可以被.env配置文件覆盖
- nuxt.config.js
```javascript
export default defineNuxtConfig({
  runtimeConfig: {
    // 只在服务端可以访问的配置项
    apiSecret: '123',
    // 可以暴露给客户端使用的配置项
    public: {
      apiBase: '/api'
    }
  }
})
```
- .env
```javascript
# 会覆盖 apiSecret 的值
NUXT_API_SECRET = api_secret_token
NUXT_PUBLIC_API_BASE = 'www.xxx.com'
```

- 使用 pages/index.vue
```javascript
<template>
  <div>
    {{ runtimeConfig }}
  </div>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
console.log(runtimeConfig.apiSecret);
console.log(runtimeConfig.public.apiBase);
</script>
```

### 2.app.config.ts 编译构建时配置
在项目的根目录下新建app.config.ts文件，里头的配置主要是在项目的构建和编译阶段中会使用到。与运行时的配置相反，这里的配置不能被环境变量覆盖。
常用于配置网站基础信息，名称，logo，主题，皮肤等不敏感数据。
- app.config.js
```javascript
// app.config.ts
export default defineAppConfig({
  title: 'Hello Nuxt',
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000'
    }
  }
})
```
- 使用 pages/index.vue
```javascript
<script setup lang="ts">
const appConfig = useAppConfig()
</script>

```

### 3.使用process.env
.env可以多个，通过package.json启动命令来控制
```javascript
"scripts": {
  "dev": "nuxt dev --dotenv .env.dev"
  "build": "nuxt build --dotenv .env.prod"
}
```
- .env
```javascript
VUE_APP_VALUE = 'VALUE123123' 
VUE_APP_BASEURL = 'https://www.blockxu.top'
```
运行后，在服务器上，通过process.env.VUE_APP_VALUE就可以获取到对应的变量，但是客户端获取不到，而且build后，不论在客户端还是服务端，都无法获取到process.env

- 通过vite的define解决
```javascript
let define = {};
// 处理process.env以便在客户端能够取到
Object.keys(process.env).forEach((name) => {
  define["process.env." + name] = JSON.stringify(process.env[name]);
});

export default defineNuxtConfig({
  vite: {
    define: {
      ...define,
    }
  }
})

```