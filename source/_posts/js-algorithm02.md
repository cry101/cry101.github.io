---
title: js算法题2
date: 2019-11-28 17:23:17
tags: [javascript, algorithm]
index_img: /img/cover/0f7ab95b.webp
---


### 1.只出现一次的数字
示例:
输入: [2,2,1]
输出: 1

```javascript
var singleNumber = function(nums) {
    //求和减去重复项
    return [...new Set(nums)].reduce((a,b)=>a+b)*2 - nums.reduce((a,b)=> a+b)
};
```

### 2.求众数
示例:
输入: [2,2,1,1,1,2,2]
输出: 2
```javascript
var majorityElement = function(nums) {
    let countObj = {};
    //计算出现的次数
    nums.map(item => {
        countObj[item] = countObj[item]? countObj[item]+1: 1;
    })
    for(let i in countObj){
        if(countObj[i] > nums.length/2){
            return i
        }
    }
};
```

### 3.搜索二维矩阵 II
示例:
现有矩阵 matrix 如下：
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。
给定 target = 20，返回 false。

```javascript
//通用无序搜索
var searchMatrix = function(matrix, target) {
    return [].concat(...matrix).includes(target)
};
```

```javascript
//二分搜索
var searchMatrix = function(matrix, target) {
    
};
```
