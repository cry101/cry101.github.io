---
title: vue3服务端渲染 nuxt-01问题总结
date: 2023-03-30 10:45:57
tags: [vue,vue3,nuxt]
categories: Vue
index_img: https://s2.loli.net/2023/02/10/S6hfmUQCxEWwIyH.jpg
---

### 1.动态设置layout后，切换报错
* 错误内容：DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.

* 报错原因：
由于某些页面不使用默认的layout，设置了自定义头部等。
```javascript
definePageMeta({
  layout: false,
});
```
设置false会导致失去layout的布局，切换的时候后续子节点将无法加入不存在的父节点。

* 解决方案：
```javascript
// app.vue
<template>
  <div class="app-container">
    <Html>
      <Head>
        <Title>{{ webSizeName }}</Title>
        <Meta charset="utf-8" />
        <Meta name="referrer" content="no-referrer" />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
    </Html>
    <!--important-->
    <NuxtLayout :key="$route.fullPath">
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
</script>
```
根据页面路径设置NuxtLayout的key值，让切换路由的时候重新渲染

### 2.自定义组件注入报错
rollup-plugin-inject: failed to parse D:/Vscode Projects/video_h5/video-app/src/utils/components/Toast.vue. Consider restricting the plugin to particular files via options.include

Hydration completed but contains mismatches.
自定义组件和一些不支持ssr的组件包裹在<client-only>里


### 3.异步请求报错
不直接使用axios，使用useAxios，不然异步请求会报错500
```javascript
interface API {
  '/list': {
    page: number,
    size: number
  }
}

function requestGet<T extends keyof API>(url: T, params?: API[T]) {
    return useAxios(url, { method: 'GET', params }, instance)
}

function requestPost<T extends keyof API>(url: T, data?: API[T]) {
    return useAxios(url, { method: 'POST', data  }, instance)
}
```

### 4.路由对应的页面需要一个根元素
路由对应的页面需要一个根元素 —— 虽然 Vue3 支持多个根元素，但在 Nuxt3 里面，如果进入多根元素页面，再跳转去其他页面，会导致页面空白