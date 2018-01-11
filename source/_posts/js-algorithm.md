---
title: js算法题
date: 2018-01-10 17:19:16
tags:
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




