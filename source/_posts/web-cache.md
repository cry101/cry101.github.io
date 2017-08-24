---
title: 前端性能优化-缓存
date: 2017-08-15 09:53:25
tags: [web,cookie]
---
### 1.sessionStorage
关闭页面自动回收，页面刷新不会清除，不可跨页面交互。

### 2.userData
早期IE用的存储方案。
单个文件大小限制是128kb，一个域名下总共可以保存1024kb;
在受限站点里这两个值分别是64kb和640kb;

### 3.Cookie
优点：兼容性最好，几乎所有的浏览器都支持。
缺点：大小有限制，而且每次发送请求，请求头里都会带着Cookie一起发过去，现在基本大多数登陆的合法性验证都是用cookie验证的。

### 4.openDatabase
完整的前端数据库
```javascript
var dataBase;
this.createDatabase = function() {
    dataBase = openDatabase("teacher", "1.0", "教师表", 1024 * 1024, function() {});
    if (!dataBase) {
        alert("数据库创建失败！");
    } else {
        alert("数据库创建成功！");
    }
}

this.createTable = function() {
    dataBase.transaction(function(context) {
        context.executeSql(
            "create table if not exists teacher (id REAL UNIQUE, name TEXT)", [],
            function(context, result) {
                alert('创建teacher表成功');
            },
            function(context, error) {
                alert('创建teacher表失败:' + error.message);
            });
    });
}

this.insertData = function() {
    dataBase.transaction(function(context) {
        context.executeSql(
            "insert into teacher (id, name) values(?, ?)", ["1", 'aa老师'],
            function() {
                console.log('添加数据成功');
            },
            function(context, error) {
                console.log('添加数据失败: ' + error.message);
            });
    });
    dataBase.transaction(function(context) {
        context.executeSql(
            "insert into teacher (id, name) values(?, ?)", ["2", 'bb老师'],
            function() {
                console.log('添加数据成功');
            },
            function(context, error) {
                console.log('添加数据失败: ' + error.message);
            });
    });
    dataBase.transaction(function(context) {
        context.executeSql(
            "insert into teacher (id, name) values(?, ?)", ["3", 'cc老师'],
            function() {
                console.log('添加数据成功');
            },
            function(context, error) {
                console.log('添加数据失败: ' + error.message);
            });
    });
}

this.queryData = function() {
    dataBase.transaction(function(context) {
        context.executeSql(
            "select * from teacher", [],
            function(context, result) {
                console.log(result);
                console.log(context);

            },
            function(context, error) {
                alert('查询失败: ' + error.message);
            });
    });
}

//删除表
this.dropTable = function() {
    dataBase.transaction(function(tx) {
        tx.executeSql('drop table teacher');
    });
}
```

### 5.localstorage
优点：兼容性中等，操作简单，就是key-value形式，几乎现代的浏览器都支持。
缺点：存在大小限制(5M)，IE9,IE10不支持。不跨浏览器，不跨域名。
```javascript
localStorage.setItem("keyl", "valuel");

localStorage.clear();
```
