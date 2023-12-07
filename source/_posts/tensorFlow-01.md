---
title: tensorFlow.js入门
date: 2019-01-29 14:24:45
tags: [tensorFlow]
index_img: /img/cover/ahcx8-hzrje.jpg
---
cdn地址：
https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.9.0

### 1.张量(Tensor)和变量（Variable）
变量由张量生成，且张量不可变而变量可变。
Tensor实例的构造函数就是 tf.tensor 函数,有个shape属性来定义这一组数值如何组成张量。
```javascript
// 2x3 Tensor
const shape = [2, 3]; // 2 行, 3 列
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // 打印张量值
// 输出:    [[1 , 2 , 3 ],
//          [10, 20, 30]]

// shape也可以用下面的方式实现:
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
// 输出:    [[1 , 2 , 3 ],
//          [10, 20, 30]]
```
为了构造低秩张量，还可以用下面函数增强代码可读性。
```javascript
const a = tf.scalar(3.14);
a.print(); // 输出零维张量

const b = tf.tensor2d([[2, 3, 4], [5, 6, 7]]);
b.print(); // 输出二维张量

const c = tf.zeros([2, 3]);
c.print(); // 输出2行3列的值全是0的张量

const d = tf.ones([3, 5]);
d.print(); // 输出3行5列的值全是1的张量
```

变量是通过初始化张量得到的，是可变的，使用变量的assign方法分配一个新的tensor到这个变量上，这是变量就会改变。
```javascript
const initialValues = tf.zeros([5]);
const biases = tf.variable(initialValues); // 初始化biases
biases.print(); // 输出: [0, 0, 0, 0, 0]

const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues); // 更新 biases的值
biases.print(); // 输出: [0, 1, 0, 1, 0]
```


### 2.模型
简单的说，一个模型就是一个函数。
创建模型的两种方式：
（1）通过操作（ops）来直接完成模型本身所做的工作
```javascript
function predict(input) {
  // y = a * x ^ 2 + b * x + c
  // More on tf.tidy in the next section
  return tf.tidy(() => {
    const x = tf.scalar(input);

    const ax2 = a.mul(x.square());
    const bx = b.mul(x);
    const y = ax2.add(bx).add(c);

    return y;
  });
}
//注意：所有的数字都需要经过tf.scalar()张量处理。
const a = tf.scalar(2);
const b = tf.scalar(4);
const c = tf.scalar(8);

const result = predict(2);
result.print() 
```
(2)通过高级API tf.model来创建一个模型
```javascript
const model = tf.sequential();
model.add(
  tf.layers.simpleRNN({
    units: 20,
    recurrentInitializer: 'GlorotNormal',
    inputShape: [80, 4]
  })
);

const optimizer = tf.train.sgd(LEARNING_RATE);
model.compile({optimizer, loss: 'categoricalCrossentropy'});
model.fit({x: data, y: labels});
```

### 3.内存管理
(1)dispose：在张量或变量上调用dispose来清除它并释放其GPU内存
```javascript
const x = tf.tensor2d([[0.0, 2.0], [4.0, 6.0]]);
const x_squared = x.square();

x.dispose();
x_squared.dispose();
```

(2)tf.tidy执行一个函数并清除所有创建的中间张量，释放它们的GPU内存。
它不清除内部函数的返回值。
```javascript
const average = tf.tidy(() => {
  const y = tf.tensor1d([1.0, 2.0, 3.0, 4.0]);
  const z = tf.ones([4]);

  return y.sub(z).square().mean();
});

average.print()
```
注意：
传递给tf.tidy的函数应该是同步的，并且不会返回Promise。我们建议在tf.tidy内不要有更新UI或在发出远程请求的代码。

tf.tidy不会清理变量。变量通常持续到机器学习模型的整个生命周期，因此TensorFlow.js不会清理它们，即使它们是在tidy中创建的。不过，您可以手动调用dispose处理它们。


