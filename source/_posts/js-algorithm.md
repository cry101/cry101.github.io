---
title: js算法题
date: 2018-01-10 17:19:16
tags: javascript
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
result:
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







