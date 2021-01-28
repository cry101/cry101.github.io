---
title: algo-1
date: 2020-01-01 17:00:47
tags: [javascript, algorithm]
categories: Javascript
---

### 二叉搜索树BST
#### 1.判断BST的合法性
对于每一个节点root，代码值检查了它的左右孩子节点是否符合左小右大的原则；但是根据 BST 的定义，root的整个左子树都要小于root.val，整个右子树都要大于root.val。
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {Boolean}
*/
const isValidBST = (root) = {
    // 辅助函数传值{TreeNode} min max
    const isValid = (root, min, max) => {
        if (root === null) return true
        // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
        if (min !== null && root.val <= min.val) return false
        if (max !== null && root.val >= max.val) return false
        // 限定左子树的最大值是 root.val，右子树的最小值是 root.val
        return isValid(root.left, min, root) &&
                isValid(root.right, root, max)
    }
    return isValid(root, null, null)
}

```

#### 2.在BST中搜索一个数
根据target和root.val的大小比较，就能排除一边。
```javascript
/**
 * @param {TreeNode} root
 * @param {Number} target
 * @return {Boolean}
*/
const isInBST = (root, target) => {
    if (root === null) return false
    if (root.val === target) return true

    // 但是穷举了所有节点
    // return isInBST(root.left, target) || isInBST(root.right, target);

    // 利用BST特性排除一半
    if (root.val < target) return isInBST(root.right, target)
    if (root.val > target) return isInBST(root.left, target)
}
```

#### 3.在BST中插入一个数
```javascript
/**
* @param {TreeNode} root
* @param {Number} val
* @return {TreeNode}
*/
const insertIntoBST = (root, val) {
    if (root === null) return new TreeNode(val)
    if (root.val > val) {
        root.right = insertIntoBST(root.right, val)
    } 
    if (root.val < val) {
        root.left = insertIntoBST(root.left, val)
    }
    return root
}
```

#### 4.在BST中删除一个数
```javascript
/**
* @param {TreeNode} root
* @param {Number} val
* @return {TreeNode}
*/
const deleteNode = (root, val) {
    if (root === null) return null
    if (root.val === val) {
        // 没有子节点或者只有一个子节点
        if (root.left === null) return root.right
        if (root.right === null) return root.left
        // 有两个子节点 - 取右边最小来替换
        let minNode = getMin(root.right)
        root.val = minNode.val
        root.right = deleteNode(root.right, minNode.val)
    }
    if (root.val > val) {
        root.right = deleteNode(root.right, val)
    } 
    if (root.val < val) {
        root.left = deleteNode(root.left, val)
    }
    return root
}

// BST的最左子树就是最小
const getMin(node) {
    while(node.left !== null) node = node.left
    return node
}
```
