---
title: js算法题
date: 2019-09-10 17:19:16
tags: [javascript, algorithm]
categories: Javascript
index_img: /img/cover/0f7ab95b.webp
---

### 1.Remove String Spaces
```javascript
function noSpace(x){
  return x.replace(/\s/g, '');
}
```

### 2.Sort array by string length
```javascript
function sortByLength (array) {
  // Return an array containing the same strings, ordered from shortest to longest
  return array.sort((a,b) = >a.length - b.length)
}
```

### 3.Handle String
result：
```javascript
accum("abcd");    // "A-Bb-Ccc-Dddd"
accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt");    // "C-Ww-Aaa-Tttt"
````

```javascript
function accum(s) {
	// your code
  if(/^[A-Za-z]*$/.test(s)){
    let arr = s.split('');
    let newArr = [];
    arr.map((item,index)=>{
        let str = item.toUpperCase()
        while(index>0){
          str += item.toLowerCase();
          index--
        }
        newArr.push(str)
    })
    return newArr.join('-')
  }
}
```

better:
```javascript
function accum(s) {
  return s.split('').map((x,index) => x.toUpperCase()+Array(index+1).join(x.toLowerCase())).join('-');
}
function accum(s) {
  return s.split('').map((c, i) => (c.toUpperCase() + c.toLowerCase().repeat(i))).join('-');
}
```

### 4.Handle Arr
result：
```text
["az", "toto", "picaro", "zone", "kiwi"] -->
[["az", "toto picaro zone kiwi"], 
 ["az toto", "picaro zone kiwi"], 
 ["az toto picaro", "zone kiwi"], 
 ["az toto picaro zone", "kiwi"]]
````

```javascript
function partlist(arr) {
    // your code
    let newArr = [],
        preArr = [],
        copy = arr.slice(0);//copy arr
    for(let i = 0;i < arr.length-1;i++){
      let newItem = [];
      preArr.push(copy.shift());// shift arr
      newItem.push(preArr.join(' '));
      newItem.push(copy.join(' '));
      newArr.push(newItem);
    }
    return newArr
}
```
better
```javascript
var partlist=a=>a.map((v,i)=>[a.slice(0,i).join(' '),a.slice(i).join(' ')]).slice(1)
```

### 5.Get the Middle Character
result：
```text
runBF("test\0") should return "es"

runBF("testing\0") should return "t"

runBF("middle\0") should return "dd"

runBF("A\0") should return "A"
```

```javascript
function getMiddle(s)
{
  let a = parseInt(s.length/2); // 5/2 -> 2
  return s.length % 2? s.substr(a,1) : s.substr(a-1,2) //odd:even
}
```
better:
```javascript
function getMiddle(s)
{
  return s.substr(Math.ceil(s.length / 2 - 1), s.length % 2 === 0 ? 2 : 1);
}
```

### 6.Vowel Count
result:
```javascript
getCount('aeiou'); //5 a,e,i,o,u
getCount('abcde'); //2 a,e
```
```javascript
function getCount(str) {
  var vowelsCount = 0,
      arr = ['a','e','i','o','u'];
  str.split('').map(i=>{
    if(arr.indexOf(i)>=0){ //arr.indexOf('i') -> 2
      vowelsCount++
    }
  })
  return vowelsCount;
}
```

better:
```javascript
function getCount(str) {
  return (str.match(/[aeiou]/ig)||[]).length;
}
```

### 7.Highest and Lowest
result:
```javascript
highAndLow("1 2 3 4 5"); // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"
```

```javascript
function highAndLow(numbers){
  let arr = numbers.split(" ").sort((a,b)=>a-b);// sort arr
  return arr[arr.length-1] + ' ' + arr[0]
}
```

better:
```javascript
function highAndLow(numbers){
  numbers = numbers.split(' ');
  return `${Math.max(...numbers)} ${Math.min(...numbers)}`;
}
```

### 8.Array Diff
result:
```javascript
//It should remove all values from list a, which are present in list b.
array_diff([1,2],[1]) //return [2]
array_diff([1,2,2,2,3],[2]) //return [1,3]
```
```javascript
function array_diff(a, b) {
// splice导致数组变化
//   a.map((j,i)=>{
//     if(b.indexOf(j) >= 0){
//       a.splice(i,1)    
//     }
//   }) 
return a.filter(e => b.indexOf(e)<0)
}
```
other:
```javascript
//includes判断数组是否有某元素
function array_diff(a, b) {
  return a.filter(e => !b.includes(e));
}
```

### 9.Find the odd int
result:
```javascript
findOdd([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5]) //return 5
findOdd([1,1,2,-2,5,2,4,4,-1,-2,5]); //return -1
findOdd([20,1,1,2,2,3,3,5,5,4,20,4,5]); //return 5
```
```javascript
function findOdd(A) {
  //happy coding! 
  let obj = {}//count obj
  A.map(i=>{
    for(let j = 0;j<A.length;j++){
      if(i==A[j]){
        obj[i] = obj[i]?obj[i]+1:1;
        break;
      }
    }
  })
  for(let k in obj){
    if(obj[k]%2){
        return parseInt(k)
    }
  }
  return 0;
}
```
better
```javascript
//异或位运算符，看不懂
const findOdd = (xs) => xs.reduce((a, b) => a ^ b);
```

### 10.Persistent Bugger.
result:
```javascript
//which is the number of times you must multiply the digits in num until you reach a single digit.
persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4  count:3
                       // and 4 has only one digit
                       
persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,  count:4
                        // 1*2*6 = 12, and finally 1*2 = 2

persistence(4) === 0 // because 4 is already a one-digit number count:0
```

```javascript
function persistence(num) {
   //code me
  let count = 0;
  while(String(num).length > 1){
    num = String(num).split('').map(Number).reduce((a,b) => a*b)
    count++
  }
  return count
}
```

better：
```javascript
const persistence = num => {
  return `${num}`.length > 1 
    ? 1 + persistence(`${num}`.split('').reduce((a, b) => a * +b)) 
    : 0;
}
```


### 11.The Supermarket Queue
函数有两个输入变量：
客户：表示队列的正整数数组。每个整数表示一个客户，其值是它们需要检查的时间量。
N：一个正整数，结账柜台的数量。

函数应该返回一个整数，所需的总时间。
result:
```javascript
queueTime([5,3,4], 1)
// should return 12
// because when n=1, the total time is just the sum of the times

queueTime([10,2,3,3], 2)
// should return 10
// because here n=2 and the 2nd, 3rd, and 4th people in the 
// queue finish before the 1st person has finished.

queueTime([2,3,10], 2)
// should return 12
```
```javascript
function queueTime(customers, n) {
  if(customers.length == 0) return 0;
  let arr = customers.splice(0,n).sort((a,b)=>a-b);
  customers.map(i=>{
    arr[0] += i;
    arr.sort((a,b)=>a-b)
  })
  return Math.max(...arr)
}
```
better
```javascript
//不需要截第一个数组，不需要排序，直接对最小的值加
function queueTime(customers, n) {
  var w = new Array(n).fill(0);
  for (let t of customers) {
    let idx = w.indexOf(Math.min(...w));
    w[idx] += t;
  }
  return Math.max(...w);
}
```

### 12.toWeirdCase
result: 大写小写大写小写
```javascript
//even upper/ odd lower
toWeirdCase( "String" );//=> returns "StRiNg"
toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe"
```

```javascript
function toWeirdCase(string){
  return string.split(' ').map(k=>
    k.split('').map((e,i)=>i%2?e.toLowerCase():e.toUpperCase()).join('')
  ).join(' ')
}
```
better:
```javascript
//每匹配两个字母
function toWeirdCase(string){
  return string.replace(/(\w{1,2})/g,(m)=>m[0].toUpperCase()+m.slice(1))
}
```

### 13.Handle Time
result
```javascript
humanReadable(60) //rerurn '00:01:00',
humanReadable(86399) //return '23:59:59'
humanReadable(359999) //return '99:59:59'
```

```javascript
function humanReadable(seconds) {
  let zero = m => parseInt(m)<10? '0'+parseInt(m):parseInt(m);
  if(seconds<60){
    return `00:00:${zero(seconds)}`
  } else if( 60<=seconds && seconds<60*60){
    return `00:${zero(seconds/60)}:${zero(seconds%60)}`
  } else {
    return `${zero(seconds/60/60)}:${zero(parseInt(seconds/60)%60)}:${zero(seconds%60)}`
  }
}
```

```javascript
//傻了，不用判断时间
function humanReadable(seconds) {
  var pad = function(x) { return (x < 10) ? "0"+x : x; }
  return pad(parseInt(seconds / (60*60))) + ":" +
         pad(parseInt(seconds / 60 % 60)) + ":" +
         pad(seconds % 60)
}
```


### 14.Split Strings
result:
```javascript
solution('abc') // should return ['ab', 'c_']
solution('abcdef') // should return ['ab', 'cd', 'ef']
```
```javascript
//偶数次会导致末尾多个空,直接用match更好
function solution(str){
   return str.replace(/(\w{1,2})/g,m=>m[1]?m[0]+m[1]+'-':m[0]+'_').split('-').filter(i=>i&&i.trim())
}
```
better:
```javascript
function solution(str){
   return (str + "_").match(/../g);
}
```

### 15.Arrays of cats and dogs
result: Dog在n个节点内抓到Cat，return被抓的C
```javascript
//solve(['D','C','C','D','C'], 2) = 2, because the dog at index 0 (D0) catches C1 and D3 catches C4. 
//solve(['C','C','D','D','C','D'], 2) = 3, because D2 catches C0, D3 catches C1 and D5 catches C4.
//solve(['C','C','D','D','C','D'], 1) = 2, because D2 catches C1, D3 catches C4. C0 cannot be caught because n == 1.
//solve(['D','C','D','D','C'], 1) = 2, too many dogs, so all cats get caught!
```

```javascript
function solve(arr,n){
 let count = 0;
 arr.map((k,i)=>{
   let start = i-n>0?i-n:0;
       catchRange = arr.slice(start,i+n+1), //be catched range
       index = catchRange.indexOf('D');//the dog index
   if( k=='C' && index>=0){
     count++
     arr[index+start] = '' //the dog catch cat,let it go
   }
 })
 return count;
}
```

### 16.Dont drive too long!
result: Drive的时间<9小时
```javascript
 var dailyShedule = [ ["7:00-10:30","Drive"],
                        ["10:30-10:45","Rest"],
                        ["10:45-11:45","Drive"],
                        ["11:45-12:15","Rest"],
                        ["12:15-16:45","Drive"],
                        ["16:45-20:15","Work"]]; 
            //-> should return false,9 hours of driving in total.
```

```javascript
function shouldIBeTired(dailyShedule){
  let time = 0
  dailyShedule.map(i=>{
    if(i[1]=="Drive"){
      let arr = i[0].split('-');
      time += (arr[1].split(':')[0] - arr[0].split(':')[0])+ (arr[1].split(':')[1] - arr[0].split(':')[1])/60;
    }
  })
  return time>9
}
```

### 17.Array plus array
result:
```javascript
//arrayPlusArray([1, 2, 3], [4, 5, 6]), 21
```

```javascript
function arrayPlusArray(arr1, arr2) {
  return arr1.reduce((a,b)=>a+b) + arr2.reduce((a,b)=>a+b)
}
```
better:
```javascript
function arrayPlusArray(arr1, arr2) {
  return arr1.concat(arr2).reduce((acc, cur) => acc + cur);
}

function arrayPlusArray(...arrays) {
  return [].concat(...arrays).reduce((a,b) => a+b,0)
}
```

### 18.order Array
result:
```javascript
//"56 65 74 100 99 68 86 180 90" 
//ordered by numbers weights becomes: "100 180 90 56 65 74 68 86 99"
// 100->1+0+0 =1     56/65 -> '56'<'65'
```

```javascript
function orderWeight(string) {
    let fn = (n)=>n.split('').reduce((a,b)=>(+a)+(+b))//plus num
    return string.split(' ').sort((a,b)=>{
      return fn(a)==fn(b)?(a>b?1:-1):fn(a)-fn(b)
    }).join(' ')
}
```

### 19.Magic Squares
result:
判断是否是数独
```javascript
var arr = [
[8, 1, 6] 
[3, 5, 7]
[4, 9, 2]
];  //return true
```
思路：把所有情况组成个新数组
```javascript
function magicSquare(arr){
  if(arr.length == 0 || arr[0] == null) return false;
  let newArr = [...arr],
      flag = true,
      len = arr.length,
      sum = arr[0].reduce((a,b)=>a+b);
      arr[0].map((i,n)=>{
        let item = [];
        if(n == 0){ //X
          let item2 = []
          for(let j = 0; j<len; j++){
            item2.push(arr[j][j])
          }
          newArr.push(item2)
        }
        if(n == len){ //X
          let item3 = []
          for(let j = 0; j<len; j++){
            item3.push(arr[j][n-j])
          }
          newArr.push(item3)
        }
        for(let j = 0; j<len; j++){ // |||
          item.push(arr[j][n])
        }
        newArr.push(item)
      })
      newArr.map(k=>{
        flag = flag && sum == k.reduce((a,b)=>a+b)
      })
      return flag
}
```

### 20.Sum of array singles
result:
```javascript
//repeats([4,5,7,5,4,8]) = 15 
// because only the numbers 7 and 8 occur once, and their sum is 15.
```
```javascript
function repeats(arr){
  return 2*([...new Set(arr)].reduce((a,b)=>a+b)) -  arr.reduce((a,b)=>a+b)
}
```
better:
```javascript
//filter 索引不变代表唯一，达到筛选效果
function repeats(arr){
  return arr.filter(v => arr.indexOf(v) === arr.lastIndexOf(v)).reduce((a,b) => a + b, 0);
}
```


### 21.Sentence Calculator
result:
Lower case [a-z]: 'a'=1, 'b'=2, 'c'=3, ..., 'z'=26
Upper case [A-Z]: 'A'=2, 'B'=4, 'C'=6, ..., 'Z'=52
Digits [0-9] their numeric value: '0'=0, '1'=1, '2'=2, ..., '9'=9
Other characters: 0 value
//lettersToNumbers("I Love You"), 170
```javascript
 function lettersToNumbers(s) {
   let sum = 0;
   s.split('').map(i=>{
     let num = i.charCodeAt();
     if(num>64 && num<91){
       sum += (num-64)*2
     } else if( num>96 && num<123){
       sum += num-96
     } else if( num>47 && num< 58 ) {
       sum += +i
     }
   })
   return sum
 }
```
better:
```javascript
 function lettersToNumbers(s) {
   let key = c =>
     /[a-z]/.test(c) ? c.charCodeAt() - 96 :
     /[A-Z]/.test(c) ? (c.charCodeAt() - 64) * 2 :
     /\d/.test(c) ? +c : 0
   return [...s].reduce((s, v) => s + key(v), 0)
 }
```

### 22.Follow that Spy
首位相连
Example:
routes = [[USA, BRA], [JPN, PHL], [BRA, UAE], [UAE, JPN]]
result: "USA, BRA, UAE, JPN, PHL"
```javascript
// it should return the places from the given routes
function findRoutes(routes) {
  //Your code here...
  let result = [],
      last = '';
  (function eachRoutes(){
    let arr = [];
        flag = true;
    routes.map(item => {
      if(result.length === 0){//find first
        routes.map(i => {
          arr.push(i[0], i[1])
        })
        let noRepeat = arr.filter(j => arr.indexOf(j) === arr.lastIndexOf(j));
        result = routes.filter(n => noRepeat.includes(n[0]))[0];
        last = routes.filter(n => noRepeat.includes(n[1]))[0];
      } else {
        if(result[result.length-1] === last[1]){
          flag = false;
        }
        if(item[0] === result[result.length-1]){
          result.push(item[1])
        }
      }
    })
    if(!flag) return;
    eachRoutes()
  })()
  return result.join(', ')
}
```


### 23.Convert string to camel case
result: 
toCamelCase("the-stealth-warrior") // returns "theStealthWarrior"
toCamelCase("The_Stealth_Warrior") // returns "TheStealthWarrior"

```javascript
function toCamelCase(str){
  return str.split(/[-_]/g).map((i,j) => j>0? i.substr(0,1).toUpperCase() + i.substr(1): i).join('')
}
```
better:
```javascript
function toCamelCase(str){
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}
```

### 24.回文数
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
result:
121，11，1221   --> true
123   --> false
```javascript
var isPalindrome = function(x) {
    let arr = String(x).split('');
    return String(x).substr(0,parseInt(arr.length/2)) === arr.splice(Math.ceil(arr.length/2)).reverse().join('').toString()
};
```

### 25.删除排序数组中的重复项
result:
[0,0,1,1,1,2,2,3,3,4] --> 原数组被修改为 0, 1, 2, 3, 4

```javascript
var removeDuplicates = function(nums) {
    let arr = nums.slice(0); //复制原数组
    nums.splice(0,arr.length); //清空原数组
    nums.push(...new Set(arr)); //给原数组添加元素
};
```





