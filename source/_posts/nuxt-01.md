---
title: vue3服务端渲染 nuxt-01
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
