# JS Quiz2

Quiz 来源：http://dmitry.baranovskiy.com/post/91403200

以下简短的 5 道题，考查对 JavaScript 核心知识的理解。不要用调试工具，直接思考答案。（注意，以下题目都是考虑在浏览器环境下运行的，而不是 Node 环境）

## 目录

[题目](#题目)

[解答](#解答)

---

## 题目

### Q1

```javascript
if (!('a' in window)) {
    var a = 1;
}
console.log(a);
```

[查看解析](#a1)

### Q2

```javascript
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
console.log(a);
```

[查看解析](#a2)

### Q3

```javascript
function a(x) {
    return x * 2;
}
var a;
console.log(a);
```

[查看解析](#a3)

### Q4

```javascript
function b(x, y, a) {
    arguments[2] = 10;
    console.log(a);
}
b(1, 2, 3);
```

[查看解析](#a4)

### Q5

```javascript
function a() {
    console.log(this);
}
a.call(null);
```

[查看解析](#a5)

---

## 解答

总的来说，这几道题还是很基础的，相比于 [Quiz1](https://github.com/nightn/front-end-plan/blob/master/js/js-quiz1.md) 简单不少。以下是解析。

### A1

考查声明提升。`var a  = 1` 虽然在 if 内部，但也进行了声明提升，所以运行 if 语句的时候，`window` 已经存在 a 属性了，所以 if 判断为 false，不会执行 a 的赋值操作，因此 a 为 undefined。

答案是 undefined。

[返回题目](#q1)

### A2

这道题考查函数声明和函数表达式。你可以能认为，a 既是一个变量声明，又是一个函数声明。其实不然，在这里，function a(){...} 这一块其实是一个具有名字的函数表达式，而不是函数声明。**当我们把函数声明的代码放到一个需要值的位置上的时候，它实际上变成了函数表达式** 。因此只有变量声明才会提升，a 的值为 1。

答案是 1。

[返回题目](#q2)

### A3

这道题也是考查声明提升。变量声明和函数声明都可以提升，那如果变量名和函数名相同呢？答案是：**函数声明提升的优先级大于变量声明的优先级**。所以 a 是一个函数。

答案是 `ƒ a(x) { return x * 2; }` 。

[返回题目](#q3)

### A4

考查函数内部对象 `arguments` 。`arguments` 是函数内部的一个类数组对象，指向函数接收的参数。在这里，`arguments[2]` 和 `a` 是同一个意思。

答案为 10。

[返回题目](#q4)

### A5

考查 this 绑定。this 绑定是在函数调用时确定的，此处调用了 `call` 方法，它将 this 绑定到 `call` 接收的第一个参数，如果该参数是 undefined 或 null，那么将绑定到全局对象（非严格模式下），在浏览器绑定到 window 对象。更多关于 this 的介绍请参考 [JS this](https://github.com/nightn/front-end-plan/blob/master/js/js-this.md) 。

答案是 window。

[返回题目](#q5)





