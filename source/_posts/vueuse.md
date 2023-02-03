---
title: vueuse-基于 Composition API 的实用函数集合
date: 2022-08-15 16:53:49
tags: [vue]
index_img: https://s2.loli.net/2023/02/03/tz5OefcMlsLQb1v.jpg
---

### 1.官网地址
[定义](https://vueuse.org/)
vueuse：将一切原本并不支持响应式的JS API变得支持响应式

示例
```javascript
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

export default {
  setup() {
    // 实时获取鼠标位置
    const { x, y } = useMouse()

    // 用户是否喜欢暗黑风格
    const isDark = usePreferredDark()

    // 持久化数据到本地存储
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    return { x, y, isDark, store }
  },
}
```

### 2.常用方法
#### （1）防抖debounceFilter和节流throttleFilter
```javascript
import { debounceFilter, throttleFilter, useLocalStorage, useMouse } from '@vueuse/core'

// changes will write to localStorage with a throttled 1s
const storage = useLocalStorage('my-key', { foo: 'bar' }, { eventFilter: throttleFilter(1000) })

// mouse position will be updated after mouse idle for 100ms
const { x, y } = useMouse({ eventFilter: debounceFilter(100) })
```

#### （2）useDateFormat日期格式化
```javascript
<script setup lang="ts">

import { ref, computed } from 'vue-demi'
import { useNow, useDateFormat } from '@vueuse/core'

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

</script>

<template>
  <div>{{ formatted }}</div>
</template>
```

#### （3）useFullscreen全屏展示
```javascript
//isFullscreen 当前是否是全屏
//toggle  是函数直接调用即可
const { isFullscreen, toggle } = useFullscreen();
```

#### （4）useClipboard粘贴功能
```javascript
//text 粘贴的内容
//copy 是粘贴函数
const { text, copy, isSupported } = useClipboard({ copiedDuring: 1500 });
```




