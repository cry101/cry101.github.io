---
title: php基础语法
date: 2018-01-26 09:57:03
tags: php
---

### 1.string类型
####（1）string中单双引号的区别
string的单引号中，转义序列不会被替换；
而双引号和heredoc结构中会，如\n换行，双引号中的变量会被解析。
heredoc格式：
```php
echo <<<EOT
My name is "$name". I am printing some $foo->foo.
Now, I am printing some {$foo->bar[1]}.
This should print a capital 'A': \x41
EOT;
```
####（2）string中的变量解析
```php
$juices = array("apple", "orange", "koolaid1" => "purple");

class people {
    public $john = "John Smith";
    public $jane = "Jane Smith";
    public $robert = "Robert Paulsen";
    
    public $smith = "Smith";
}

$people = new people();

echo "$people->john drank some $juices[0] juice.".PHP_EOL;
echo "$people->john then said hello to $people->jane.".PHP_EOL;
echo "$people->john's wife greeted $people->robert.".PHP_EOL;
echo "$people->robert greeted the two $people->smiths."; // Won't work

//复杂语法：
// 有效，只有通过花括号语法才能正确解析带引号的键名
echo "This works: {$arr['key']}";
```
####(3)string的转化
一个布尔值 boolean 的 TRUE 被转换成 string 的 "1"。
Boolean 的 FALSE 被转换成 ""（空字符串）。
NULL 总是被转变成空字符串。
直接把 array，object 或 resource 转换成 string 不会得到除了其类型之外的任何有用信息。可以使用函数 print_r() 和 var_dump() 列出这些类型的内容。


### 2.Array数组

