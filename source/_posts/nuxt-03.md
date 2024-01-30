---
title: nuxt-03 重写路由或自定义路由的两种方案
date: 2023-05-30 15:07:12
tags: [vue,vue3,nuxt]
categories: Vue
index_img: /img/cover/nuxt.png
---
[参考文档](https://ezdoc.cn/docs/nuxtjs/going-further/custom-routing)
### 1.重写 router.options.ts
- 项目根目录下创建 app/router.options.ts 
```javascript
// API(router): https://nuxt.com/docs/api/configuration/nuxt-config
import { RouterOptions } from 'vue-router'

// 这些事需要移除的nuxt自动生成的路由
const REMOVE_NUXT_ROUTES = [
  '/auth/user',
  '/base/material',
]

// 这些是我们重写的路由
const routesEx:RouterOptions['routes'] = [
  {
    path: '/auth/my-user.html', // 路由随便根据需求写即可
    name: 'auth-user',
    component: () => import('../pages/auth/user.vue')
  },
  {
    path: '/base/material.html', // 路由随便根据需求写即可
    name: 'base-material',
    component: () => import('../pages/base/material.vue')
  }
]

export default {
  routes: (nuxtRoutes:RouterOptions['routes']) => {
    // 对路由数据进行过滤处理
    return nuxtRoutes.filter(r => !REMOVE_NUXT_ROUTES.includes(r.path)).concat(routesEx)
  }
}

```

### 2.nuxt.config.ts 中重写 hooks->'pages:extend'钩子事件
```javascript
// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from 'path'

// 这些事需要移除的nuxt自动生成的路由
const REMOVE_NUXT_ROUTES = [
  '/auth/user'
]

export default defineNuxtConfig({
  ... ...其他配置
  hooks: {
    'pages:extend': (pages) => {
      // 过滤出你要删除掉路由（根据自己的需求写这里的过滤逻辑，可以把不想要的路由都去掉）
      const pagesToRemove = pages.filter(page => REMOVE_NUXT_ROUTES.includes(page.path))
      for (const page of pagesToRemove) {
        pages.splice(pages.indexOf(page), 1)
      }

      // 追加你自定义的路由
      pages.push({
        path: '/:name.html',
        file: resolve(__dirname, 'pages/reports/[name].vue')
      }, {
        path: '/my-user',
        file: resolve(__dirname, 'pages/user.vue')
      })
    }
  }
})


```
