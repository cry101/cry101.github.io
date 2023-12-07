---
title: vue keep-alive动态缓存组件
date: 2021-04-22 11:49:30
tags: vue
categories: Vue
excerpt: 需求：有个活动列表A界面，打开活动B界面，B界面操作不少，还可以跳转打卡C界面，需要缓存B界面。A => B，B => C，C => B需要缓存，B => A 返回取消缓存。
index_img: /img/cover/3.webp
---

{% note info %}
需求：有个活动列表A界面，打开活动B界面，B界面操作不少，还可以跳转打卡C界面，需要缓存B界面。
A => B，B => C，C => B需要缓存，B => A 返回取消缓存。
{% endnote %}
### 1.使用include而不是meta来判断
常规用法：通过路由里meta的值来判断，beforeRouteLeave里把meta的keepAlive设置false
```jsx
// App.vue
<div id="app">
    <transition name="fade">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
    </transition>
    <transition name="fade">
        <router-view v-if="!$route.meta.keepAlive" />
    </transition>
</div>
```
```js
// router/index.js
const router = {
    {
        path: '/home',
        component: () => import('@/views/home/Home'),
        meta: { keepAlive: true }, // 重点
    }
}
```

* 通过include实现动态判断

```jsx
<template>
    <keep-alive :include="keepPages" :max="5">
        <router-view />
    </keep-alive>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Layout extends Vue{
    get keepPages() {
        return this.$store.getters.keepPages
    }
}
</script>
```

### 2.使用vuex管理缓存界面
```ts
// store/modules/app.ts

// keepPages如果为空的话会缓存所有界面
const getDefaultState = () => {
    return {
        keepPages: ['UserActivity'] // 默认缓存UserActivity组件
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state: any) => {
        Object.assign(state, getDefaultState())
    },
    CHANGE_PAGES(state:any, arr:any) {
        state.keepPages = arr;
    },
    KEEP_PAGE(state:any, name:any) {
        const arr = state.keepPages;
        if (!arr.includes(name)) {
            arr.push(name);
        }
        state.keepPages = arr;
    },
    REMOVE_PAGE(state:any, name:any) {
        state.keepPages = state.keepPages.filter((i:any) => i !== name);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions: {}
}
```

### 3.界面上使用
```ts
// UserActivity组件
<template>
    ...
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    beforeRouteLeave(to:any, form: any, next:any) {
        // 返回列表A的时候删除
        if (to.name === 'UserArea') {
            this.$store.commit("app/REMOVE_PAGE", this.$options.name);
        }
        next()
    }
})
export default class UserActivity extends Vue{
    mounted() {
        // 进界面后缓存
        this.$store.commit("app/KEEP_PAGE", this.$options.name);
    }
}
</script>
```